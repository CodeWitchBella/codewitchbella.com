import {
  FlexBox,
  Heading,
  SpectacleLogo,
  UnorderedList,
  CodeSpan,
  OrderedList,
  ListItem,
  FullScreen,
  Progress,
  Appear,
  Stepper,
  Slide,
  Deck,
  Text,
  Grid,
  Box,
  Image,
  CodePane,
  MarkdownSlide,
  MarkdownSlideSet,
  Notes,
  fadeTransition,
} from 'spectacle'
import { Axes, ExampleObjects, GSpringLoop, GStepperSpring } from './diagrams'
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'
import { OriginScale } from './origin-scale'

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
      <FullScreen />
    </Box>
    <Box padding="1em">
      <Progress />
    </Box>
  </FlexBox>
)

export function Presentation() {
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
              href="/?presenterMode=true"
              style={{ all: 'unset', cursor: 'pointer' }}
              target="_blank"
            >
              Skořepová
            </a>
          </Heading>
        </FlexBox>
      </Slide>
      <Slide
        backgroundColor="tertiary"
        backgroundImage={`url(${
          new URL('./headsets.png', import.meta.url).href
        })`}
        backgroundOpacity={0.5}
      >
        <Heading>About me</Heading>
        <UnorderedList>
          <ListItem>
            Student of Computer Graphics at CTU FEE{' '}
            <svg viewBox="0 0 125.762 96.137004" height="1em">
              <use
                href={new URL('./ctu_lion.svg', import.meta.url).href + '#lion'}
              />
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
            <InlineMath math="{\pi \over 8} = 22.5^{\circ}" />
            counter-clockwise
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
            <GSpringLoop
              from={{ transform: 'translateX(0px) translateY(0px)' }}
              to={{ transform: 'translateX(3px) translateY(1px)' }}
            >
              <ExampleObjects />
            </GSpringLoop>
          </Axes>
        </Grid>
      </Slide>

      <Slide
        transition={{
          from: { transform: 'translateX(100%)' },
          enter: { opacity: 2, transform: 'translateX(0%)' },
          leave: { opacity: 1, transform: 'translateX(0%)' },
        }}
      >
        <Heading>Octopus 2 Inspector</Heading>
        <Image
          src={new URL('./octopus-inspect.png', import.meta.url).href}
          style={{ maxWidth: '100%' }}
        />
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
    </Deck>
  )
}
