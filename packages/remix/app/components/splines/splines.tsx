import React, { useEffect, useRef, useState } from 'react'
import { cubicHermiteSpline } from './cubic-hermite-spline'
export { default as styles } from './splines.css'

export function Splines() {
  const ref = useRef<HTMLCanvasElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const resize = () => {
      const width = canvas.clientWidth * window.devicePixelRatio
      const height = canvas.clientHeight * window.devicePixelRatio
      setSize((p) =>
        p.width !== width || p.height !== height ? { width, height } : p
      )
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    return () => window.removeEventListener('resize', resize)
  }, [])

  const [points, setPoints] = useState<
    readonly (readonly [x: number, y: number])[]
  >([])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const handle = requestAnimationFrame(() => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.resetTransform()

      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, width, height)
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      ctx.fillStyle = 'black'
      console.log(points)
      for (const pt of points) {
        ctx.beginPath()
        ctx.ellipse(pt[0], pt[1], 5, 5, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      const t = 0,
        b = 0,
        c = 0
      for (let i = 1; i < points.length - 2; ++i) {
        const pi = points[i]
        const pim1 = points[i - 1]
        const pip1 = points[i + 1]
        const pip2 = points[i + 1]
        const dik1 = ((1 - t) * (1 + b) * (1 + c)) / 2
        const dik2 = ((1 - t) * (1 - b) * (1 - c)) / 2
        const dik3 = ((1 - t) * (1 + b) * (1 - c)) / 2
        const dik4 = ((1 - t) * (1 - b) * (1 + c)) / 2
        const di = [
          dik1 * (pi[0] - pim1[0]) + dik2 * (pip1[0] - pi[0]),
          dik1 * (pi[1] - pim1[1]) + dik2 * (pip1[1] - pi[0]),
        ] as const
        const dip1 = [
          dik3 * (pip1[0] - pi[0]) + dik4 * (pip2[0] - pip1[0]),
          dik3 * (pip1[1] - pi[1]) + dik4 * (pip2[1] - pip1[1]),
        ] as const
        for (let t = 0; t <= 1; t += 0.01) {
          const v = cubicHermiteSpline(t, {
            point0: pi,
            point1: pip1,
            tangent0: di,
            tangent1: dip1,
          })
          console.log(t, v)
          ctx.fillRect(...v, 2, 2)
        }
      }
    })
    return () => cancelAnimationFrame(handle)
  }, [height, points, width])

  return (
    <>
      <canvas
        ref={ref}
        style={{ alignSelf: 'stretch', flexGrow: 1 }}
        width={width}
        height={height}
        onClick={(event) => {
          const form = formRef.current
          if (!form) return
          const action = new FormData(form).get('action')
          if (!action || typeof action !== 'string') return
          const point = [
            event.clientX - event.currentTarget.clientLeft,
            event.clientY - event.currentTarget.clientTop,
          ] as const
          if (action === 'add') {
            setPoints((arr) => arr.concat([point]))
          }
        }}
      />
      <form
        ref={formRef}
        style={{
          position: 'fixed',
          top: 8,
          left: 8,
          borderRadius: 8,
          background: 'lightgray',
          padding: 8,
        }}
      >
        <label>
          <input type="radio" name="action" value="add" />
          Add point
        </label>
        <label>
          <input type="radio" name="action" value="remove" />
          Remove point
        </label>
        <label>
          <input type="radio" name="action" value="move" />
          Move point
        </label>
      </form>
    </>
  )
}
