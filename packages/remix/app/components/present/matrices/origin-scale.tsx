import { InlineMath } from 'react-katex'
import { animated, useSpring } from '@react-spring/web'
import {
  Slide,
  Heading,
  Grid,
  UnorderedList,
  ListItem,
} from '@codewitchbella.com/spectacle'
import { Axes, ExampleObjects, SlideGuard } from './diagrams'
const scale = [2, 2] as const

export function OriginScale() {
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
      <SlideGuard>
        <Animation from="scale(1,1)" to={`scale(${scale.join(',')})`} />
      </SlideGuard>
    </Slide>
  )
}
function Animation({ from, to }: { from: string; to: string }) {
  const spring = useSpring({
    to: async (next) => {
      while (true) {
        await next({
          transform: `translate(0px, 0px) ${from} translate(-1px, -2px)`,
        })
        await next({
          transform: `translate(0px, 0px) ${to} translate(-1px, -2px)`,
        })
        await next({
          transform: `translate(1px, 1px) ${to} translate(-1px, -2px)`,
        })
        await new Promise((res) => setTimeout(res, 1000))
        await next({
          transform: `translate(1px, 1px) ${from} translate(-1px, -2px)`,
        })
        await new Promise((res) => setTimeout(res, 1000))
      }
    },
    from: { transform: `translate(0px, 0px) ${from} translate(0px, 0px)` },
  })
  return (
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
  )
}

export function RotateAround() {
  return (
    <Slide>
      <Heading>Rotate around a point</Heading>
      <div style={{ marginTop: -25 }}>
        <UnorderedList>
          <ListItem>Move to origin, rotate, move back</ListItem>
          <InlineMath
            math={`\\begin{aligned}
                \\begin{bmatrix}x^{\\prime} \\\\ y^{\\prime}\\end{bmatrix}
                  &= 
                T \\cdot R \\cdot T^{-1} \\begin{bmatrix}x \\\\ y\\end{bmatrix} \\\\
                \\\\
                M &= T \\cdot R \\cdot T^{-1} \\\\
                \\begin{bmatrix}x^{\\prime} \\\\ y^{\\prime}\\end{bmatrix}
                  &= 
                M \\begin{bmatrix}x \\\\ y\\end{bmatrix} 
                   
                \\end{aligned}`}
          />
        </UnorderedList>
      </div>
      <SlideGuard>
        <Animation from="rotate(0deg)" to="rotate(-22.5deg)" />
      </SlideGuard>
    </Slide>
  )
}

export function TRS() {
  return (
    <Slide>
      <Heading>Scale, Rotate, Translate</Heading>
      <div style={{ marginTop: -25 }}>
        <UnorderedList>
          <ListItem>Conventional order of applying transformations</ListItem>
          <ListItem>
            <InlineMath math="M = T\cdot R\cdot S" />
          </ListItem>
          <ListItem>First scale, then rotate, then translate</ListItem>
          <ListItem>Translation means position</ListItem>
          <ListItem>Animates nicely</ListItem>
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
        <OrdersAnimation />
      </div>
    </Slide>
  )
}

type Order = 'trs' | 'tsr' | 'rts' | 'rst' | 'str' | 'srt'
function OrdersAnimation({ order = 'trs' }: { order?: Order }) {
  const parts = {
    s: ['scale(1)', 'scale(2)'],
    r: ['rotate(0deg)', 'rotate(-22.5deg)'],
    t: ['translate(0px,0px)', 'translate(3px,2px)'],
  }
  const orderItems: readonly ('t' | 'r' | 's')[] = order.split('') as any
  const from = {
    transform:
      orderItems.map((item, index) => parts[item][0]).join(' ') +
      ` translate(-1px, -2px)`,
    angle: 0,
    length: 0,
  }
  const spring = useSpring({
    delay: 1000,
    to: async (next) => {
      while (true) {
        for (let i = order.length - 1; i >= 0; --i) {
          await next({
            transform:
              orderItems
                .map((item, index) => parts[item][i <= index ? 1 : 0])
                .join(' ') + ` translate(-1px, -2px)`,
            angle: order.substring(i).includes('r') ? Math.PI / 8 : 0,
            length: order.substring(i).includes('t')
              ? Math.sqrt(3 * 3 + 2 * 2)
              : 0,
          })
        }
        await new Promise((res) => setTimeout(res, 1000))
        await next(from)

        await new Promise((res) => setTimeout(res, 1000))
      }
    },
    from,
  })
  const headdiff = 0.055
  const linehead = 0.27
  return (
    <Axes
      pre={
        <>
          <animated.line
            x1={-3}
            y1={-2}
            x2={spring.length.to(
              (v) => (3 / Math.sqrt(3 * 3 + 2 * 2)) * (v - linehead)
            )}
            y2={spring.length.to(
              (v) => (2 / Math.sqrt(3 * 3 + 2 * 2)) * (v - linehead)
            )}
            stroke="currentColor"
            strokeWidth={0.1}
            markerEnd="url(#arrow-white)"
            clipPath="url(#clip-to-content)"
          />
          <g transform="scale(5)">
            <animated.path
              d={spring.angle.to(
                (v) =>
                  `M0,1 A 1 1 -22.5 0 0 ${Math.max(Math.sin(v - headdiff), 0)}
              ${Math.cos(Math.max(v - headdiff, 0))}`
              )}
              stroke="white"
              strokeWidth={0.1 / 5}
              markerEnd="url(#arrow-white)"
            />
          </g>
        </>
      }
    >
      <animated.g style={{ transform: spring.transform }}>
        <ExampleObjects />
      </animated.g>
    </Axes>
  )
}

export function Orders() {
  return (
    <Slide>
      <Heading>Different orders</Heading>
      <div style={{ maxWidth: 880, margin: '-25px auto 0 auto' }}>
        <Grid gridTemplateColumns="repeat(3, 1fr)">
          <SlideGuard>
            <OrderGridItem order="trs" />
            <OrderGridItem order="srt" />
            <OrderGridItem order="str" />
            <OrderGridItem order="tsr" />
            <OrderGridItem order="rst" />
            <OrderGridItem order="rts" />
          </SlideGuard>
        </Grid>
      </div>
    </Slide>
  )
}

function OrderGridItem({ order }: { order: Order }) {
  return (
    <div style={{ position: 'relative', paddingLeft: 10, paddingRight: 10 }}>
      <OrdersAnimation order={order} />
      <div
        style={{
          position: 'absolute',
          bottom: 25,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <InlineMath math={order.toUpperCase().split('').join('\\cdot ')} />
      </div>
    </div>
  )
}
