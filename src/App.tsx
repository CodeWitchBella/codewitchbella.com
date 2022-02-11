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
import { InlineMath, BlockMath } from 'react-katex'

const formidableLogo =
  'https://avatars2.githubusercontent.com/u/5078602?s=280&v=4'

// SPECTACLE_CLI_THEME_START
const theme = {
  fonts: {
    header: 'Inter, "Open Sans Condensed", Helvetica, Arial, sans-serif',
    text: 'Inter, "Open Sans Condensed", Helvetica, Arial, sans-serif',
  },
}
// SPECTACLE_CLI_THEME_END

// SPECTACLE_CLI_TEMPLATE_START
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
// SPECTACLE_CLI_TEMPLATE_END

const SlideFragments = () => (
  <>
    <Slide>
      <Text>This is a slide fragment.</Text>
    </Slide>
    <Slide>
      <Text>This is also a slide fragment.</Text>
      <Appear>
        <Text>This item shows up!</Text>
      </Appear>
      <Appear>
        <Text>This item also shows up!</Text>
      </Appear>
    </Slide>
  </>
)

export function Presentation() {
  return (
    <Deck theme={theme} template={template}>
      <Slide>
        <FlexBox height="100%" flexDirection="column">
          <Heading margin="0px" fontSize="85px">
            ✨<i>Transformation Matrices</i>✨
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
            <ListItem>
              angle: <InlineMath math="\alpha = {\pi \over 8}" />
            </ListItem>
            <ListItem>
              origin:{' '}
              <InlineMath math="O = \begin{bmatrix}0 \\ 0\end{bmatrix}" />
            </ListItem>
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
