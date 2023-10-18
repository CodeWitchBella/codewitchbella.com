import CodeMirror from "@uiw/react-codemirror";
import { lezerLanguage } from "@codemirror/lang-lezer";
import type { ReactNode } from "react";
import { Component, useState } from "react";

import { buildParser } from "@lezer/generator";

import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { styleTags, Tag } from "@lezer/highlight";
import { basicSetup } from "codemirror";
import { createTheme } from "@uiw/codemirror-themes";

const initialGrammar = `
@top File { Line+ }

Chord { chordStart ChordContent chordEnd }

Line {
  (SectionStart | character | Chord)
  (text | Chord)*
  (newline | EOF)
}

@tokens {
  SectionStart { $[0-9] "." }
  newline { '\\n' }
  character { ![\\n\\[] }
  chordStart { "[" }
  chordEnd { "]" }
  ChordContent { ![\\n\\]]+ }
  text { ![\\n\\[]+ }
  EOF { @eof }
}
`.trim();

const initialExample = `
1. When [C]the days are cold, And [G]the cards all fold
And [Ami]the saints we see, Are [F]all made of gold
When [C]your dreams all fail, And [G]the ones we hail
Are [Ami]the worst of all, And [F]the blood’s run stale
`.trim();

export default function PostOutlet() {
  const [grammar, setValue] = useState(initialGrammar);
  const [example, setExample] = useState(initialExample);
  return (
    <div className="no-prose">
      <h2 className="prose dark:prose-invert">Grammar</h2>
      <CodeMirror
        extensions={[lezerLanguage]}
        value={grammar}
        onChange={(val) => setValue(val)}
        theme="dark"
      />
      <ErrorBoundary
        key={grammar}
        fallback={
          <PlaygroundNoGrammar
            value={example}
            onChange={(v) => setExample(v)}
          />
        }
      >
        <Playground
          grammar={grammar}
          value={example}
          onChange={(v) => setExample(v)}
        />
      </ErrorBoundary>
    </div>
  );
}

function Playground({
  grammar,
  value,
  onChange,
}: {
  grammar: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const warnings: any[] = [];
  const stash = console.warn;
  console.warn = (w) => warnings.push(w);
  const parser = buildParser(grammar);
  console.warn = stash;

  const t = Object.fromEntries(
    parser.nodeSet.types.map((t) => [t.name, Tag.define()]),
  );

  let parserWithMetadata = parser.configure({
    props: [styleTags(t)],
  });

  const exampleLanguage = LRLanguage.define({
    parser: parserWithMetadata,
    languageData: {
      commentTokens: { line: ";" },
    },
  });

  // prettier-ignore
  const colors = ["#e6194b","#3cb44b","#ffe119","#4363d8","#f58231","#911eb4","#46f0f0","#f032e6","#bcf60c","#fabebe","#008080","#e6beff","#9a6324","#fffac8","#800000","#aaffc3","#808000","#ffd8b1","#000075","#808080","#ffffff","#000000"];

  const styles = Object.entries(t).map(([k, tag], i) => {
    const bg = colors[i % colors.length];
    const sum = [bg.slice(1, 3), bg.slice(3, 5), bg.slice(5, 7)]
      .map((v) => Number.parseInt(v, 16))
      .reduce((a, b) => a + b, 0);
    return {
      tag,
      style: {
        background: bg,
        color: sum > 400 ? "black" : "white",
      },
      name: k,
    };
  });

  const theme = createTheme({
    theme: "light",
    settings: {},
    styles: styles.map((s) => ({ tag: s.tag, ...s.style })),
  });

  const parsed = parser.parse(value);
  return (
    <>
      {warnings.length ? (
        <>
          <h2 className="prose dark:prose-invert">Warnings</h2>
          {warnings.map((w, i) => (
            <div key={i}>{w}</div>
          ))}
        </>
      ) : null}
      <h2 className="prose dark:prose-invert">Example code</h2>
      <CodeMirror
        extensions={[
          basicSetup,
          new LanguageSupport(exampleLanguage, []),
          theme,
        ]}
        value={value}
        onChange={onChange}
        theme="dark"
      />
      <div className="flex gap-1 mt-2">
        <div>Higlighting:</div>
        {styles.map((s) => (
          <span key={s.name} style={s.style}>
            {s.name}
          </span>
        ))}
      </div>
      <h2 className="prose dark:prose-invert">Parsed tree</h2>
      <pre>
        <code className="hljs">{prettyfi(parsed.toString())}</code>
      </pre>
    </>
  );
}

function prettyfi(tree: string) {
  const lines = tree
    .replace(/([(,])/g, "$1\n")
    .replace(/[)]/g, "\n)")
    .split("\n");
  let indent = 0;
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    if (line.endsWith(")") || line.endsWith("),")) indent--;
    lines[i] = " ".repeat(indent * 2) + line;
    if (line.endsWith("(")) indent++;
  }
  return lines.join("\n");
}

function PlaygroundNoGrammar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <>
      <h2 className="prose dark:prose-invert">Example code</h2>
      <CodeMirror
        extensions={[basicSetup]}
        value={value}
        onChange={onChange}
        theme="dark"
      />
    </>
  );
}

class ErrorBoundary extends Component<{
  children: ReactNode;
  fallback: ReactNode;
}> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: error.message };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h2 className="prose dark:prose-invert">Error</h2>
          <div>{this.state.hasError}</div>
          {this.props.fallback}
        </>
      );
    }

    return this.props.children;
  }
}
