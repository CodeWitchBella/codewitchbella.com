import React from 'react'
import ReactDOM from 'react-dom'
import './inter-3.19/inter.css'
import { Presentation } from './App'
import { Defs } from './diagrams'

ReactDOM.render(
  <React.StrictMode>
    <Defs />
    <Presentation />
  </React.StrictMode>,
  document.getElementById('root')
)
