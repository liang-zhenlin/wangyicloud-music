import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'

// type GetStateFnType = typeof store.getState
// type IRootState = ReturnType<GetStateFnType>

function App() {
  return (
    <div className="App">
      <AppHeader />

      <Suspense fallback="loading...">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>

      <AppFooter />
    </div>
  )
}

export default App
