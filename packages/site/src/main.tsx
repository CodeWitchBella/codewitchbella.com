import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import '@codewitchbella.com/base/css'
import Present from '@codewitchbella.com/present'
const Rozvrh = React.lazy(() => import('./rozvrh/rozvrh'))
const RozvrhSemester1 = React.lazy(() => import('./rozvrh/semester1'))

function Index() {
  return (
    <div>
      <Link to="/present">Presentations</Link>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<Index />} />
          <Route path="present/*" element={<Present />} />
          <Route path="rozvrh" element={<Rozvrh />} />
          <Route path="rozvrh/semester1" element={<RozvrhSemester1 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
