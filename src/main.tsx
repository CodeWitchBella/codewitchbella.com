import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './inter-3.19/inter.css'
const Matrices = React.lazy(() => import('./matrices'))

function Index() {
  return (
    <div>
      <Link to="/matrices">CG Math</Link>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/matrices" element={<Matrices />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
