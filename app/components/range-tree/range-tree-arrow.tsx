import type { CSSProperties } from 'react';
import React, { useEffect, useRef } from 'react'

export function ArrowEnd({
  id,
  ...rest
}: {
  id: string
  className?: string
  style?: CSSProperties
}) {
  return <div data-arrow-end-id={id} {...rest} />
}

export function ArrowStart({
  id,
  ...rest
}: {
  id: string
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const startEl = ref.current
    const endEl = document.querySelector('[data-arrow-end-id="' + id + '"]')

    if (!startEl || !endEl) return
    const start = startEl.getBoundingClientRect()
    const end = endEl.getBoundingClientRect()

    const dir = {
      x: end.left - start.left,
      y: end.top - start.top,
    }

    const length = Math.sqrt(dir.y * dir.y + dir.x * dir.x)
    startEl.style.width = length + 'px'
    let rot = (Math.atan(dir.y / dir.x) * 180) / Math.PI
    if (dir.x < 0) rot += 180
    startEl.style.transform = `rotate(${rot}deg) translateY(-0.5px)`
    return () => {
      startEl.style.width = ''
      startEl.style.transform = ''
    }
  })
  return (
    <div
      {...rest}
      className={'position-relative ' + (rest.className || '')}
      data-arrow-to={id}
    >
      <div
        style={{
          position: 'absolute',
          borderBottom: '1px solid black',
          transformOrigin: 'top left',
        }}
        ref={ref}
      ></div>
    </div>
  )
}
