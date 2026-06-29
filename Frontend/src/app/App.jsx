import React from 'react'
import { routes } from './app.routes.jsx'
import { RouterProvider } from 'react-router'

const App = () => {
  return (
    <RouterProvider router={routes}/>
  )
}

export default App
