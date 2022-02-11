import { PropsWithChildren, useContext, useEffect, useRef } from 'react'
import { SlideContext, Stepper } from 'spectacle'
import { useSpring, animated } from 'react-spring'

export function Defs() {
  return (
    <svg>
      <defs>
        <marker id="arrow-red" viewBox="0 -5 10 10" orient="auto">
          <path d="M-1,-5L10,0L-1,5" fill="red" />
        </marker>
        <marker id="arrow-blue" viewBox="0 -5 10 10" orient="auto">
          <path d="M-1,-5L10,0L-1,5" fill="lightblue" />
        </marker>
      </defs>
    </svg>
  )
}

export function Axes({ children }: PropsWithChildren<{}>) {
  return (
    <svg
      viewBox="-2 -2 102 102"
      style={{ width: '100%', aspectRatio: '1 / 1' }}
    >
      <line
        x1={0}
        x2={90}
        y1={0}
        y2={0}
        stroke="red"
        markerEnd="url(#arrow-red)"
      />
      <line
        x1={0}
        x2={0}
        y1={-0.5}
        y2={90}
        stroke="lightblue"
        markerEnd="url(#arrow-blue)"
      />
      <g style={{ transform: 'scale(10)' }}>{children}</g>
    </svg>
  )
}

export function ExampleObjects() {
  return (
    <>
      <circle cx={2} cy={7} r={0.5} fill="white" />
      <rect x={1} y={2} width={2} height={1} fill="white" />
    </>
  )
}

type Defined<T> = T extends undefined ? never : V

export function GStepperSpring({
  from,
  to,
  children,
  step = 0,
}: PropsWithChildren<{
  from: React.SVGAttributes<SVGGElement>['style']
  to: Defined<React.SVGAttributes<SVGGElement>['style']>
  step?: number
}>) {
  const { activeStepIndex, isSlideActive } = useContext(SlideContext)
  const spring = useSpring(
    step === 0
      ? {
          from,
          to: activeStepIndex >= 0 ? to : from,
          delay: activeStepIndex >= 0 ? 700 : 0,
        }
      : activeStepIndex >= 0
      ? to
      : from
  )
  return (
    <>
      {step > 0 ? <Stepper values={[0]}>{() => null}</Stepper> : null}
      <animated.g style={spring}>{children}</animated.g>
    </>
  )
}

export function GSpringLoop({
  from,
  to,
  children,
}: PropsWithChildren<{
  from: React.SVGAttributes<SVGGElement>['style']
  to: Defined<React.SVGAttributes<SVGGElement>['style']>
}>) {
  const spring = useSpring({
    from,
    to,
    loop: { reverse: true, delay: 500 },
  })
  return <animated.g style={spring}>{children}</animated.g>
}
