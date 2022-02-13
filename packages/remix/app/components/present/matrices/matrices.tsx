import {
  FlexBox,
  Heading,
  UnorderedList,
  CodeSpan,
  ListItem,
  FullScreen,
  Progress,
  Appear,
  Stepper,
  Slide,
  Deck,
  Grid,
  Box,
  Image,
  Notes,
} from '@codewitchbella.com/spectacle'
import {
  Axes,
  Defs,
  ExampleObjects,
  GSpringLoop,
  GStepperSpring,
} from './diagrams'
import { InlineMath } from 'react-katex'
import { Orders, OriginScale, RotateAround, TRS } from './origin-scale'
import { useLocation } from 'remix'

// TODO: use new URL (see below) once/if remix supports it
import ctuLion from './ctu_lion.svg'
// const ctuLion = new URL('./ctu_lion.svg', import.meta.url).href
import headsetsUrl from './headsets.png'
// const headsetsUrl = new URL('./headsets.png', import.meta.url).href
import octopusInspect from './octopus-inspect.png'
// const octopusInspect = new URL('./octopus-inspect.png', import.meta.url).href

const theme = {
  //https://coolors.co/palette/713e5a-63a375-edc79b-d57a66-ca6680-f283b6-f0544f-bc96e6-d8b4e2-a44200
  colors: {
    primary: '#f8e9d7',
    secondary: '#f8c1da',
    tertiary: '#2d1924',
  },
  fonts: {
    header: 'Inter, "Open Sans Condensed", Helvetica, Arial, sans-serif',
    text: 'Inter, "Open Sans Condensed", Helvetica, Arial, sans-serif',
  },
}

const template = () => (
  <FlexBox
    justifyContent="space-between"
    position="absolute"
    bottom={0}
    width={1}
  >
    <Box padding="0 1em">
      <FullScreen color="white" size={16} />
    </Box>
    <Box padding="1em">
      <Progress color="white" size={8} />
    </Box>
  </FlexBox>
)

export default function Matrices() {
  return (
    <>
      <Defs />
      <Presentation />
    </>
  )
}

function Presentation() {
  const location = useLocation()
  return (
    <Deck theme={theme} template={template}>
      <Slide>
        <FlexBox height="100%" flexDirection="column">
          <Heading margin="0px" fontSize="90px">
            ✨<i>Transformations &amp; Matrices</i>✨
          </Heading>
          <Heading margin="0px 32px" color="primary" fontSize="h3">
            Maths for Computer Graphics
          </Heading>
          <Heading margin="0px 32px" color="primary" fontSize="30px">
            Isabella{' '}
            <a
              href={location.pathname + '?presenterMode=true'}
              style={{ all: 'unset', cursor: 'pointer' }}
              target="_blank"
            >
              Skořepová
            </a>
          </Heading>
          <div style={{ position: 'absolute', bottom: 0 }}>
            <Heading margin="32px 0px 0px 0px" color="primary">
              <CodeSpan fontSize="20px">isbl.cz/p/matrices</CodeSpan>
            </Heading>
          </div>
        </FlexBox>
      </Slide>
      <Slide
        backgroundColor="tertiary"
        backgroundImage={`url(${headsetsUrl})`}
        backgroundOpacity={0.5}
      >
        <Heading>About me</Heading>
        <UnorderedList>
          <ListItem>
            Student of Computer Graphics at CTU FEE{' '}
            <svg viewBox="0 0 125.762 96.137004" height="1em">
              <use href={ctuLion + '#lion'} />
            </svg>
          </ListItem>
          <ListItem>VR developer and enthusiast</ListItem>
          <ListItem>
            Full-Stack <i style={{ fontSize: '0.5em' }}>(almost)</i> Engineer
          </ListItem>
        </UnorderedList>
        <Notes>Full-Stack: I can do many things, some of them well</Notes>
      </Slide>
      <Slide>
        <Heading>Transformations</Heading>
        <UnorderedList>
          <Appear>
            <ListItem>Rotation (otáčení)</ListItem>
          </Appear>
          <Appear>
            <ListItem>Scaling (změna měřítka)</ListItem>
          </Appear>
          <Appear>
            <ListItem>Translation (posunutí)</ListItem>
          </Appear>
          <Appear>
            <ListItem>
              Other
              <UnorderedList>
                <ListItem>Shear (zkosení)</ListItem>
                <ListItem>Symmetry (souměrnost)</ListItem>
              </UnorderedList>
            </ListItem>
          </Appear>
          <Appear>
            <ListItem>Combined (složené)</ListItem>
          </Appear>
        </UnorderedList>
      </Slide>
      <Slide>
        <Heading>Translation</Heading>
        <UnorderedList>
          <ListItem>
            Example: move by{' '}
            <InlineMath math="\begin{bmatrix}3 \\ 1\end{bmatrix}" />
          </ListItem>
        </UnorderedList>
        <Grid gridTemplateColumns="1fr 1fr 1fr 1fr">
          <div />
          <Axes>
            <ExampleObjects />
          </Axes>
          <Axes>
            <GStepperSpring
              from={{ transform: 'translateX(0px) translateY(0px)' }}
              to={{ transform: 'translateX(3px) translateY(1px)' }}
            >
              <ExampleObjects />
            </GStepperSpring>
          </Axes>
        </Grid>
      </Slide>
      <Slide>
        <Heading>Translation</Heading>
        <Grid gridTemplateColumns="2fr 1fr">
          <UnorderedList>
            <InlineMath
              math={`\\begin{aligned}
                T &= \\begin{bmatrix}3 \\\\ 1\\end{bmatrix} \\\\
                x{^\\prime} &= x + T_x \\\\
                y{^\\prime} &= y + T_y
              \\end{aligned}`}
            />
          </UnorderedList>
          <Axes>
            <GSpringLoop
              from={{ transform: 'translateX(0px) translateY(0px)' }}
              to={{ transform: 'translateX(3px) translateY(1px)' }}
            >
              <ExampleObjects />
            </GSpringLoop>
          </Axes>
        </Grid>
      </Slide>
      <Slide>
        <Heading>Scale</Heading>
        <UnorderedList>
          <ListItem>Example: scale 2x</ListItem>
        </UnorderedList>
        <Grid gridTemplateColumns="1fr 1fr 1fr 1fr">
          <div />
          <Axes>
            <ExampleObjects />
          </Axes>
          <Axes>
            <GStepperSpring
              from={{ transform: 'scale(1)' }}
              to={{ transform: 'scale(2)' }}
            >
              <ExampleObjects />
            </GStepperSpring>
          </Axes>
        </Grid>
      </Slide>
      <Slide>
        <Heading>Scale</Heading>
        <Grid gridTemplateColumns="2fr 1fr">
          <UnorderedList>
            <InlineMath
              math={`\\begin{aligned}
                S &= \\begin{bmatrix}2 \\\\ 2\\end{bmatrix} \\\\
                x{^\\prime} &= x \\cdot S_x \\\\
                y{^\\prime} &= y \\cdot S_y
              \\end{aligned}`}
            />
          </UnorderedList>
          <Axes>
            <GSpringLoop
              from={{ transform: 'scale(1)' }}
              to={{ transform: 'scale(2)' }}
            >
              <ExampleObjects />
            </GSpringLoop>
          </Axes>
        </Grid>
      </Slide>
      <OriginScale />
      <Slide>
        <Heading>Rotation</Heading>
        <UnorderedList>
          <ListItem>
            Example: rotate by{' '}
            <InlineMath math="{\pi \over 8} = 22.5^{\circ}" /> counter-clockwise
          </ListItem>
        </UnorderedList>
        <Grid gridTemplateColumns="0.5fr 1fr 1fr 0.5fr">
          <div />
          <Axes>
            <ExampleObjects />
          </Axes>
          <Axes>
            <GStepperSpring
              from={{ transform: 'rotate(0deg)' }}
              to={{ transform: 'rotate(-22.5deg)' }}
            >
              <ExampleObjects />
            </GStepperSpring>
          </Axes>
        </Grid>
      </Slide>
      <Slide>
        <Heading>Rotation</Heading>
        <Grid gridTemplateColumns="2fr 1fr">
          <UnorderedList>
            angle: <InlineMath math="\alpha = {\pi \over 8}" />
            <br />
            <br />
            <InlineMath
              math={`\\begin{aligned}
                x{^\\prime} &= x\\cdot cos(\\alpha) - y\\cdot sin(\\alpha) \\\\
                y{^\\prime} &= x\\cdot sin(\\alpha) + y\\cdot cos(\\alpha)
              \\end{aligned}`}
            />
          </UnorderedList>
          <Axes>
            <GSpringLoop
              from={{ transform: 'rotate(0deg)' }}
              to={{ transform: 'rotate(-22.5deg)' }}
            >
              <ExampleObjects />
            </GSpringLoop>
          </Axes>
        </Grid>
      </Slide>
      <Slide>
        <Heading>Rotation as a Matrix</Heading>
        <Grid gridTemplateColumns="2fr 1fr">
          <UnorderedList>
            <InlineMath
              math={`\\begin{aligned}
                x{^\\prime} &= x\\cdot cos(\\alpha) - y\\cdot sin(\\alpha) \\\\
                y{^\\prime} &= x\\cdot sin(\\alpha) + y\\cdot cos(\\alpha) \\\\
                \\begin{bmatrix}x{^\\prime} \\\\ y{^\\prime}\\end{bmatrix} &=
                \\begin{bmatrix}
                  cos(\\alpha) & -sin(\\alpha) \\\\
                  sin(\\alpha) & cos(\\alpha)
                \\end{bmatrix}
                \\begin{bmatrix}x \\\\ y\\end{bmatrix}
              \\end{aligned}`}
            />
          </UnorderedList>
          <Axes>
            <GSpringLoop
              from={{ transform: 'rotate(0deg)' }}
              to={{ transform: 'rotate(-22.5deg)' }}
            >
              <ExampleObjects />
            </GSpringLoop>
          </Axes>
        </Grid>
      </Slide>
      <Slide>
        <Heading>Scale as a Matrix</Heading>
        <Grid gridTemplateColumns="2fr 1fr">
          <UnorderedList>
            <InlineMath
              math={`\\begin{aligned}
                x{^\\prime} &= x \\cdot S_x \\\\
                y{^\\prime} &= y \\cdot S_y \\\\
                \\begin{bmatrix}x{^\\prime} \\\\ y{^\\prime}\\end{bmatrix} &=
                \\begin{bmatrix}
                  S_x & 0 \\\\
                  0 & S_y
                \\end{bmatrix}
                \\begin{bmatrix}x \\\\ y\\end{bmatrix}
              \\end{aligned}`}
            />
          </UnorderedList>
          <Axes>
            <GSpringLoop
              from={{ transform: 'scale(1)' }}
              to={{ transform: 'scale(2)' }}
            >
              <ExampleObjects />
            </GSpringLoop>
          </Axes>
        </Grid>
      </Slide>
      <Slide>
        <Heading>Translation as a Matrix</Heading>
        <Grid gridTemplateColumns="2fr 1fr">
          <UnorderedList>
            <Stepper alwaysVisible values={[0]}>
              {(value, idx, isActive) => (
                <InlineMath
                  math={`\\begin{aligned}
                x{^\\prime} &= x + T_x \\\\
                y{^\\prime} &= y + T_y \\\\
                ${
                  !isActive
                    ? `
                    \\begin{bmatrix}x{^\\prime} \\\\ y{^\\prime}\\end{bmatrix} &=
                    \\begin{bmatrix}
                      ? & ? \\\\
                      ? & ?
                    \\end{bmatrix}
                    \\begin{bmatrix}x \\\\ y\\end{bmatrix}
                    `
                    : `
                      \\begin{bmatrix}x{^\\prime} \\\\ y{^\\prime} \\\\ 1\\end{bmatrix} &=
                      \\begin{bmatrix}
                        1 & 0 & T_x \\\\
                        0 & 1 & T_y \\\\
                        0 & 0 & 1
                      \\end{bmatrix}
                      \\begin{bmatrix}x \\\\ y \\\\ 1 \\end{bmatrix}
                    `
                }
              \\end{aligned}`}
                />
              )}
            </Stepper>
          </UnorderedList>
          <Axes>
            <GSpringLoop
              from={{ transform: 'translateX(0px) translateY(0px)' }}
              to={{ transform: 'translateX(3px) translateY(1px)' }}
            >
              <ExampleObjects />
            </GSpringLoop>
          </Axes>
        </Grid>
      </Slide>
      <Slide>
        <Heading>Point vs Vector</Heading>
        <Grid gridTemplateColumns="2fr 1fr">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridTemplateRows: 'repeat(4, auto) 1fr',
              fontSize: '20px',
              gap: '20px',
              textAlign: 'center',
              fontFamily: 'Inter',
            }}
          >
            <div>Point: </div>
            <div>Vector: </div>
            <InlineMath
              math={`\\begin{bmatrix}x \\\\ y \\\\ 1\\end{bmatrix}`}
            />
            <InlineMath
              math={`\\begin{bmatrix}x \\\\ y \\\\ 0\\end{bmatrix}`}
            />
            <div style={{ marginTop: 24, gridColumn: '1 / 3' }}>
              Translated by{' '}
              <InlineMath
                math={`M_T = \\begin{bmatrix}1 & 0 & T_x \\\\
                0 & 1 & T_y \\\\
                0 & 0 & 1
                \\end{bmatrix}
              `}
              />
            </div>
            <InlineMath
              math={`\\begin{bmatrix}x+T_x \\\\ y+T_y \\\\ 1\\end{bmatrix}`}
            />
            <InlineMath
              math={`\\begin{bmatrix}x \\\\ y \\\\ 0\\end{bmatrix}`}
            />
          </div>
          <Axes>
            <line
              x1={0}
              y1={0}
              x2={8}
              y2={2}
              stroke="currentColor"
              strokeWidth={0.1}
              markerEnd="url(#arrow-white)"
            />
            <GSpringLoop
              from={{ transform: 'translateX(0px) translateY(0px)' }}
              to={{ transform: 'translateX(3px) translateY(1px)' }}
            >
              <ExampleObjects />
            </GSpringLoop>
          </Axes>
        </Grid>
      </Slide>
      <Slide>
        <Heading>Inverse transformation</Heading>
        <UnorderedList>
          <ListItem>Invert the matrix</ListItem>
          <ListItem>
            Notation: <InlineMath math="M^{-1}" />
          </ListItem>
          <ListItem>
            <InlineMath math="M^{-1}\cdot M = I = M\cdot M^{-1}" />
          </ListItem>
        </UnorderedList>
      </Slide>
      <RotateAround />
      <TRS />
      <Orders />
      <Slide
        transition={{
          from: { transform: 'translateX(100%)' },
          enter: { opacity: 2, transform: 'translateX(0%)' },
          leave: { opacity: 1, transform: 'translateX(0%)' },
        }}
      >
        <Heading>In JavaScript</Heading>
        <UnorderedList>
          <ListItem>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix"
              target="_blank"
              style={{
                all: 'unset',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              <CodeSpan>DOMMatrix</CodeSpan>
            </a>
          </ListItem>
          <ListItem>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrixReadOnly"
              target="_blank"
              style={{
                all: 'unset',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              <CodeSpan>DOMMatrixReadOnly</CodeSpan>
            </a>
          </ListItem>
        </UnorderedList>
      </Slide>

      <Slide
        transition={{
          from: { transform: 'translateX(100%)' },
          enter: { opacity: 2, transform: 'translateX(0%)' },
          leave: { opacity: 1, transform: 'translateX(0%)' },
        }}
      >
        <Heading>Octopus 2 Inspector</Heading>
        <Image src={octopusInspect} style={{ maxWidth: '100%' }} />
      </Slide>
      <Slide
        transition={{
          from: { opacity: 0, transform: 'translateX(0%)' },
          enter: { opacity: 1, transform: 'translateX(0%)' },
          leave: { opacity: 1, transform: 'translateX(-100%)' },
        }}
      >
        <Heading>Octopus 2 Inspector</Heading>
        <UnorderedList>
          <ListItem>
            On https://app.avcd.cz/ upload design and open an arboard
          </ListItem>
          <ListItem>Click on comment</ListItem>
          <ListItem>
            In url change <CodeSpan>/comment/groups/</CodeSpan>
            <br />
            to <CodeSpan>/inspect/octopus/</CodeSpan>
          </ListItem>
          <ListItem>Click on something</ListItem>
        </UnorderedList>
      </Slide>
      <Slide>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Heading>
            Thank you
            <br />
            for your attention
          </Heading>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%)',
          }}
        >
          <Heading margin="32px 0px 0px 0px" color="primary">
            <CodeSpan fontSize="20px">isbl.cz/p/matrices</CodeSpan>
          </Heading>
        </div>
      </Slide>
    </Deck>
  )
}
