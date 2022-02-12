import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './inter-3.19/inter.css'
const Matrices = React.lazy(() => import('./matrices'))

function Index() {
  return (
    <div>
      <Link to="matrices">CG Math</Link>
    </div>
  )
}

export default function PresentApp() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="matrices" element={<Matrices />} />
    </Routes>
  )
}
