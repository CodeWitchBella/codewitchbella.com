import { InlineMath } from 'react-katex'
import { animated, useSpring } from 'react-spring'
import { Slide, Heading, Grid, UnorderedList, ListItem } from 'spectacle'
import { Axes, ExampleObjects } from './diagrams'
const scale = [2, 2] as const

export function OriginScale() {
  const spring = useSpring({
    to: async (next) => {
      while (true) {
        const scales = `scale(${scale.join(',')})`
        await next({
          transform: 'translate(0px, 0px) scale(1,1) translate(-1px, -2px)',
        })
        await next({
          transform: `translate(0px, 0px) ${scales} translate(-1px, -2px)`,
        })
        await next({
          transform: `translate(1px, 1px) ${scales} translate(-1px, -2px)`,
        })
        await new Promise((res) => setTimeout(res, 1000))
        await next({
          transform: 'translate(1px, 1px) scale(1,1) translate(-1px, -2px)',
        })
        await new Promise((res) => setTimeout(res, 1000))
      }
    },
    from: { transform: 'translate(0px, 0px) scale(1,1) translate(0px, 0px)' },
  })
  return (
    <Slide>
      <Heading>Scale with origin</Heading>
      <div style={{ marginTop: -25 }}>
        <UnorderedList>
          <ListItem>
            Translate by <InlineMath math="-O" />, scale, translate by{' '}
            <InlineMath math="+O" />
          </ListItem>
          <InlineMath
            math={`\\begin{aligned}
                S &= \\begin{bmatrix}${scale[0]} \\\\ ${scale[1]}\\end{bmatrix} \\\\
                O &= \\begin{bmatrix}1 \\\\ 2\\end{bmatrix} \\\\
                x{^\\prime} &= (x - O_x) \\cdot S_x + O_x \\\\
                y{^\\prime} &= (x - O_y) \\cdot S_y + O_y
              \\end{aligned}`}
          />
        </UnorderedList>
      </div>
      <div
        style={{
          position: 'absolute',
          right: '50px',
          width: '430px',
          top: '300px',
        }}
      >
        <Axes>
          <animated.g
            style={{
              transform: spring.transform,
            }}
          >
            <ExampleObjects />
          </animated.g>
        </Axes>
      </div>
    </Slide>
  )
}
