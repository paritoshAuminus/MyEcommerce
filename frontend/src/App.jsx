import React, { useEffect } from 'react'
import { Header } from './components'
import authService from './auth/auth'
import services from './auth/service'
import { useDispatch, useSelector } from 'react-redux'
import { toast, Bounce } from 'react-toastify'
import { login } from './store/authSlice'
import { setCart } from './store/cartSlice'

function App() {

  const dispatch = useDispatch()
  const status = useSelector((state) => state.auth.status)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await authService.getUser()
        dispatch(login(response.data.user))
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    status ?
      toast.success('User logged in', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }) :
      toast.error('User logged out', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
  }, [status])

  return (
    <>
      <Header />
    </>
  )
}

export default App