import React from 'react'
import { Link } from "@remix-run/react";
const Matrices = React.lazy(() => import('./matrices/matrices'))

export function PresentIndex() {
  return (
    <div>
      <Link to="matrices">CG Math</Link>
    </div>
  )
}

const routes: { [key: string]: JSX.Element } = {
  matrices: <Matrices />,
}

export function isValidRoute(param?: string) {
  return param && param in routes
}

export default function PresentApp({ route }: { route: string }) {
  const val = routes[route]
  if (!val) return null
  return val
}
