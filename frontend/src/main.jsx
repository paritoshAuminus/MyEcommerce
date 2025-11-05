import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Products, About, Contact, Login, Signup } from './pages'
import { Provider } from 'react-redux'
import store from './store/store.js'
import ProtectedRoute from './container/Container.jsx'
import ProductDetails from './components/ProductDetails.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
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
