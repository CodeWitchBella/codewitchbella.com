import {
  SandpackProvider,
  SandpackThemeProvider,
  SandpackCodeEditor,
  SandpackTranspiledCode,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import CodeMirror from '@uiw/react-codemirror';
import { lezerLanguage } from '@codemirror/lang-lezer'
import { useState } from "react";
 

const grammar = `@top File { (Line | PageBreak)+ }

Chord { chordStart chordContent chordEnd }

Line {
  (SectionStart | lineStart | Chord)
  (text | Chord)*
  (newline | EOF)
}

SectionStart {
  ("R" digit* ":")
  | ("S:" digit*)
}

@tokens {
  digit { $[0-9] }
  newline { '\\n' }
  lineStart { ![RS\\[\\n] }
  chordStart { "[" }
  chordEnd { "]" }
  chordContent { ![\\n\\]]+ }
  text { ![\\n\\[]+ }
  PageBreak { "--- page break ---\\n" }
  EOF { @eof }
  @precedence { digit, text }
}`

const example = `
S: When [C]the days are cold, And [G]the cards all fold
And [Ami]the saints we see, Are [F]all made of gold
When [C]your dreams all fail, And [G]the ones we hail
Are [Ami]the worst of all, And [F]the blood’s run stale`.trim()


export default function PostOutlet() {
  const [value, setValue] = useState(grammar)
  return <div className="no-prose">
    <CodeMirror extensions={[lezerLanguage]} value={value} onChange={val => setValue(val)} theme="dark" />
    <SandpackProvider
    customSetup={{ 
  dependencies: { 
    "@lezer/generator": "1.5.1",
    "@lezer/lr": "1.3.13",
    "@lezer/highlight": "1.0.0",
    "@lezer/common": "1.1.0",
    "@codemirror/language": "6.0.0",
    "codemirror": "6.0.1",
    "@uiw/codemirror-themes": "4.21.20",
    "@codemirror/view": "6.21.3",
  },
  entry: '/entry.js',
}}
files={{
  "/entry.js": `
    import { buildParser } from '@lezer/generator'
    
    import {foldNodeProp, foldInside, indentNodeProp, LRLanguage, LanguageSupport} from "@codemirror/language"
    import {styleTags, Tag} from "@lezer/highlight"
    import {EditorView, basicSetup} from "codemirror"
    import { createTheme } from '@uiw/codemirror-themes'
    import {ViewPlugin} from "@codemirror/view"
  
    const grammar = ${JSON.stringify(value)}
    const parser = buildParser(grammar)
    console.log(parser)

    const t = Object.fromEntries(Object.keys(parser.termTable).map(t => [t, Tag.define()]))

    let parserWithMetadata = parser.configure({
      props: [
        styleTags(t),
      ]
    })

    export const exampleLanguage = LRLanguage.define({
      parser: parserWithMetadata,
      languageData: {
        commentTokens: {line: ";"}
      }
    })

    
    export function example() {
      return new LanguageSupport(exampleLanguage, [])
    }

    const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']

    const theme = createTheme({
      theme:'light',
      styles: Object.values(t).map((tag,i) => ({tag, background: colors[i%colors.length]}))
    })

    const savePlugin = ViewPlugin.define(() => ({
      update(update) {
        if(update.docChanged) {
          console.log(update.state.doc.toString())
          localStorage.setItem('doc', update.state.doc.toString())
        }
      }
    }))

    let view = new EditorView({
      extensions: [basicSetup, example(), theme, savePlugin],
      doc: localStorage.getItem('doc') || ${JSON.stringify(example)},
      parent: document.body
    })
  `
}}>
<SandpackLayout>
        <SandpackPreview  />
      </SandpackLayout>
</SandpackProvider>
  </div>
}
