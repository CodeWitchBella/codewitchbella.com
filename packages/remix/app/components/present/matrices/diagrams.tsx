import type { PropsWithChildren } from "react";
import { useContext, useEffect, useRef } from "react";
import { SlideContext, Stepper } from "spectacle";
import { useSpring, animated } from "@react-spring/web";

const yaxis = "#63A375";
const xaxis = "#F0544F";
const items = "#EDC79B";

export function SlideGuard({ children }: PropsWithChildren<{}>) {
  const { isSlideActive } = useContext(SlideContext);
  if (!isSlideActive) return null;
  return <>{children}</>;
}

export function Defs() {
  return (
    <svg>
      <defs>
        <marker id="arrow-xaxis" viewBox="0 -5 10 10" orient="auto">
          <path d="M-1,-5L10,0L-1,5" fill={xaxis} />
        </marker>
        <marker id="arrow-yaxis" viewBox="0 -5 10 10" orient="auto">
          <path d="M-1,-5L10,0L-1,5" fill={yaxis} />
        </marker>
        <marker id="arrow-white" viewBox="0 -5 10 10" orient="auto">
          <path d="M-1,-5L10,0L-1,5" fill="white" />
        </marker>
        <clipPath id="clip-to-content">
          <rect x="0" y="0" width="10" height="10" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function Axes({
  children,
  pre,
}: PropsWithChildren<{ pre?: JSX.Element }>) {
  return (
    <svg
      viewBox="-2 -2 102 102"
      style={{ width: "100%", aspectRatio: "1 / 1" }}
    >
      {pre ? <g style={{ transform: "scale(10)" }}>{pre}</g> : null}
      <line
        x1={0}
        x2={90}
        y1={0}
        y2={0}
        stroke={xaxis}
        markerEnd="url(#arrow-xaxis)"
      />
      <line
        x1={0}
        x2={0}
        y1={-0.5}
        y2={90}
        stroke={yaxis}
        markerEnd="url(#arrow-yaxis)"
      />
      <g style={{ transform: "scale(10)" }}>{children}</g>
    </svg>
  );
}

export function ExampleObjects() {
  return (
    <>
      <circle cx={2} cy={4.5} r={0.5} fill={items} />
      <rect x={1} y={2} width={2} height={1} fill={items} />
    </>
  );
}

export function GStepperSpring({
  from,
  to,
  children,
  step = 0,
}: PropsWithChildren<{
  from: React.CSSProperties;
  to: React.CSSProperties;
  step?: number;
}>) {
  const { activeStepIndex } = useContext(SlideContext);
  const spring = useSpring(
    step === 0
      ? {
          from,
          to: activeStepIndex >= 0 ? to : from,
          delay: activeStepIndex >= 0 ? 700 : 0,
        }
      : activeStepIndex >= 0
      ? to
      : from,
  );
  return (
    <>
      {step > 0 ? <Stepper values={[0]}>{() => null}</Stepper> : null}
      <animated.g style={spring}>{children}</animated.g>
    </>
  );
}

export function GSpringLoop({
  from,
  to,
  children,
}: PropsWithChildren<{
  from: React.CSSProperties;
  to: React.CSSProperties;
}>) {
  const spring = useSpring({
    from,
    to,
    loop: { reverse: true, delay: 500 },
  });
  return <animated.g style={spring}>{children}</animated.g>;
}
