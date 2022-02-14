/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useMemo, useState } from 'react'
import {
  Points,
  RangeTreeProvider,
  RangeTreeState,
  useRangeTreeDispatch,
  useRangeTreeState,
} from './range-tree-state'
import { ArrowEnd, ArrowStart } from './range-tree-arrow'
import styled from '@emotion/styled'
import { nextState } from './range-tree-next-step'
import {
  comesFrom,
  findHighlightedNodeFractal,
  getFractalNodes,
} from './derived'
import { PointGrid } from './point-grid'
import type { BBSTNode } from './bbst'

export function RangeTree() {
  return (
    <RangeTreeProvider>
      <RangeTreeView />
    </RangeTreeProvider>
  )
}

function getPoint(el: HTMLElement | null): { x: number; y: number } | null {
  if (!el) return null
  try {
    const point = el.dataset['point']
    if (point) {
      const [x, y] = point.split(':').map((t) => Number.parseInt(t, 10))
      return { x, y }
    }
    return getPoint(el.parentElement)
  } catch {}
  return null
}

function RangeTreeView() {
  const state = useRangeTreeState()
  const dispatch = useRangeTreeDispatch()
  const { points } = state
  return (
    <div
      css={{
        fontFamily: 'sans-serif',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '3rem',
      }}
      onMouseOver={(evt) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const point = getPoint(evt.target as any)
        dispatch({ type: 'setHover', value: point })
      }}
    >
      <div css={{ textDecoration: 'underline' }}>isbl.cz/range-tree</div>

      <div css={{ paddingBlock: '1rem' }}>
        <PointInput
          onPoint={(point) => {
            dispatch({ type: 'addPoint', point })
          }}
        />
        <button
          type="button"
          onClick={() => {
            dispatch({ type: 'loadExample' })
          }}
        >
          Load example
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'setPoints', points: [] })}
        >
          Remove all points
        </button>
      </div>

      <PointChart points={points} />
      <div css={{ paddingBlock: '1rem' }}>
        <div>Query:</div>
        <div css={{ display: 'flex', gap: '1ch' }}>
          <div css={{ display: 'flex', flexDirection: 'column' }}>
            <QueryField field="xmin" />
            <QueryField field="xmax" />
          </div>
          <div css={{ display: 'flex', flexDirection: 'column' }}>
            <QueryField field="ymin" />
            <QueryField field="ymax" />
          </div>
        </div>
      </div>
      {state.points.length > 0 ? (
        <>
          <div>
            Next step: {nextState[state.searchState.status].description}{' '}
          </div>
          <div css={{ display: 'flex', alignItems: 'stretch' }}>
            <button
              type="button"
              onClick={() => dispatch({ type: 'undo' })}
              disabled={!state.historyPrev}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => {
                dispatch({ type: 'step' })
              }}
              disabled={state.searchState.status === 'done'}
            >
              Perform
            </button>

            <button
              type="button"
              onClick={() => dispatch({ type: 'redo' })}
              disabled={!state.historyNext}
            >
              →
            </button>
          </div>

          <div css={{ display: 'flex', gap: '2rem', paddingTop: '1rem' }}>
            <BBSTView />
            <Fractal />
            <div>
              <div>Legend</div>
              <div>
                <span css={{ background: 'yellow' }}>0</span> active node
              </div>
              <div>
                <span css={{ textDecoration: 'underline' }}>0</span> split point
              </div>
              <div>
                <span css={{ fontWeight: 'bold' }}>0</span> search position
              </div>
              <div>
                <span css={{ background: 'lime' }}>0</span> mouse hover
              </div>
            </div>
          </div>
          <div
            css={{
              marginTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div>Results:</div>
            <div
              css={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '.5rem',
              }}
            >
              {state.results.length < 1 ? 'Empty' : ''}
              {state.results.map(({ x, y }, i) => (
                <div
                  key={i}
                  css={{
                    background:
                      state.hover && state.hover.x === x && state.hover.y === y
                        ? 'lime'
                        : undefined,
                  }}
                  data-point={`${x}:${y}`}
                >
                  ({x},{y})
                </div>
              ))}
            </div>
            <div css={{ minHeight: '100vh' }} />
          </div>
        </>
      ) : null}
    </div>
  )
}

function QueryField({ field }: { field: keyof RangeTreeState['query'] }) {
  const value = useRangeTreeState().query[field]
  const dispatch = useRangeTreeDispatch()
  return (
    <label>
      {field}
      {': '}
      <input
        type="number"
        value={value + ''}
        onChange={(evt) => {
          const next = Number.parseInt(evt.target?.value, 10)
          if (Number.isInteger(next))
            dispatch({ type: 'querySet', key: field, value: next })
        }}
        css={{ width: '5ch' }}
      />
    </label>
  )
}

const TreeRoot = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '1rem',
})

const TreeLine = styled.div({
  display: 'flex',
  justifyContent: 'space-evenly',
  gap: '.25rem',
})

function Fractal() {
  const state = useRangeTreeState()
  const { highlight, hover } = state
  const { fractal } = state.derived
  const highlightedNode = useMemo(() => {
    if (!state.highlight.ymin) return null
    return findHighlightedNodeFractal(fractal, highlight, state.query.ymin)
  }, [fractal, highlight, state.highlight.ymin, state.query.ymin])
  return (
    <TreeRoot>
      {fractal.layers.map((layer, layerKey) => (
        <TreeLine key={layerKey}>
          {layer.map((layerStart, ni) => (
            <div key={ni}>
              [
              {getFractalNodes(layerStart).map((node, i, list) => (
                <Fragment key={i}>
                  <span
                    data-point={`${node.x}:${node.value}`}
                    css={[
                      {
                        background:
                          hover && node.x === hover.x && node.value === hover.y
                            ? 'lime'
                            : node === highlightedNode
                            ? 'yellow'
                            : undefined,
                        position: 'relative',
                        cursor: 'pointer',
                        padding: 2,
                        '.arrow': {
                          pointerEvents: 'none',
                          opacity: comesFrom(node, highlightedNode) ? 1 : 0,
                        },
                        ':hover .arrow': {
                          opacity: 1,
                        },
                      },
                    ]}
                  >
                    {node.value}
                    <ArrowEnd
                      id={`frac:${node.key}`}
                      css={{ position: 'absolute', top: 0, left: '50%' }}
                    />
                    {node.left ? (
                      <ArrowStart
                        id={`frac:${node.left.key}`}
                        css={{ position: 'absolute', bottom: 0, left: '50%' }}
                        className="arrow"
                      />
                    ) : null}
                    {node.right ? (
                      <ArrowStart
                        id={`frac:${node.right.key}`}
                        css={{ position: 'absolute', bottom: 0, left: '50%' }}
                        className="arrow"
                      />
                    ) : null}
                  </span>
                  {i !== list.length - 1 ? ',' : null}
                </Fragment>
              ))}
              ]
            </div>
          ))}
        </TreeLine>
      ))}
    </TreeRoot>
  )
}

function BBSTView() {
  const {
    derived: { bbst },
  } = useRangeTreeState()
  return (
    <div css={{ display: 'flex' }}>
      <TreeRoot>
        {bbst.layers.map((layer, li) => (
          <div
            key={li}
            css={{
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            {layer.map((node, ni) => (
              <BBSTNodeView node={node} key={ni} li={li} ni={ni} />
            ))}
          </div>
        ))}
      </TreeRoot>
    </div>
  )
}

function BBSTNodeView({
  node,
  li,
  ni,
}: {
  node: BBSTNode
  li: number
  ni: number
}) {
  const {
    hover,
    highlight,
    searchState: { reportBacktrack, splitPoint },
    derived: { bbst },
  } = useRangeTreeState()
  return (
    <Fragment>
      <span
        data-point={`${node.value}:${node.y}`}
        css={{
          width: '2.2ch',
          textAlign: 'center',
          cursor: 'pointer',
          background:
            hover && hover.x === node.value && hover.y === node.y
              ? 'lime'
              : highlight.layer === li && highlight.id === ni
              ? 'yellow'
              : undefined,
          textDecoration:
            splitPoint.layer === li && splitPoint.id === ni
              ? 'underline'
              : undefined,
          fontWeight:
            reportBacktrack.layer === li && reportBacktrack.id === ni
              ? 'bold'
              : reportBacktrack.layer < 0 &&
                highlight.layer === li &&
                highlight.id === ni
              ? 'bold'
              : undefined,
          position: 'relative',
        }}
      >
        {node.value}
        <ArrowEnd
          id={`bbst:${li}:${ni}`}
          css={{ position: 'absolute', top: 0, left: '50%' }}
        />
        <ArrowStart
          id={`bbst:${li + 1}:${ni * 2}`}
          css={{ position: 'absolute', bottom: 0, left: '50%' }}
        />
        <ArrowStart
          id={`bbst:${li + 1}:${ni * 2 + 1}`}
          css={{ position: 'absolute', bottom: 0, left: '50%' }}
        />
      </span>
      {ni + 1 === bbst.layers[li].length
        ? Array.from({
            length: missingToPowerOfTwo(bbst.layers[li].length),
          }).map((_, fill) => (
            <span key={'fill:' + fill} css={{ width: '2.2ch' }} />
          ))
        : null}
    </Fragment>
  )
}

function missingToPowerOfTwo(l: number) {
  let power = 1
  while (true) {
    if (power >= l) {
      return power - l
    }
    power = power * 2
  }
}

let isSSR = true
function useSSR() {
  const [localIsSSR, setState] = useState(isSSR)
  useEffect(() => {
    if (localIsSSR) {
      setState(false)
      isSSR = true
    }
  }, [localIsSSR])
  return localIsSSR
}

function PointChart({ points }: { points: Points }) {
  const { query } = useRangeTreeState()

  if (useSSR()) return null
  const xmax = points.reduce(
    (b, { x: a }) => Math.max(a, b),
    Math.max(query.xmax, 8),
  )
  const ymax = points.reduce(
    (b, { y: a }) => Math.max(a, b),
    Math.max(query.ymax, 8),
  )

  return <PointGrid xmax={xmax} ymax={ymax} />
}

function PointInput({
  onPoint,
}: {
  onPoint: (point: { x: number; y: number }) => void
}) {
  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault()
        const data = new FormData(evt.currentTarget)
        const sx = data.get('x')
        const sy = data.get('y')
        console.log({ sx, sy })
        evt.currentTarget.reset()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(evt.currentTarget.querySelector('input[name=x]') as any)?.focus?.()
        if (typeof sx !== 'string' || typeof sy !== 'string') return
        const x = Number.parseInt(sx, 10)
        const y = Number.parseInt(sy, 10)
        if (!Number.isInteger(x) || !Number.isInteger(y)) return
        onPoint({ x, y })
      }}
    >
      <label>
        X:{' '}
        <input
          type="number"
          required
          min={0}
          max={100}
          step={1}
          name="x"
          css={{ maxWidth: '5ch', marginRight: '1ch' }}
        />
      </label>
      <label>
        Y:{' '}
        <input
          type="number"
          required
          min={0}
          max={100}
          step={1}
          name="y"
          css={{ maxWidth: '5ch' }}
        />
      </label>
      <button>Add point</button>
    </form>
  )
}
