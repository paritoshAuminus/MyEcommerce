import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import ProtectedRoute from './container/Container.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/cart'
            element={
              <ProtectedRoute>
              </ProtectedRoute>
            } />
          <Route
            path='/account'
            element={
              <ProtectedRoute>
              </ProtectedRoute>
            } />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
