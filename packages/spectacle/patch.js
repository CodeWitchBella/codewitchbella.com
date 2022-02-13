import fs from 'fs'
import path from 'path'

const fname = new URL('dist/index.js', import.meta.url)
const initial = fs.readFileSync(fname, 'utf-8')

const final = initial.replaceAll(
  'window.BroadcastChannel ||',
  `(typeof window !== 'undefined' ? window.BroadcastChannel : undefined) ||`
)
if (final !== initial) fs.writeFileSync(fname, final)
