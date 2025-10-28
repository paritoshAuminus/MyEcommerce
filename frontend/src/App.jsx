import React, { useEffect, useState } from 'react'
import { Header } from './components'
import authService from './auth/auth'
import services from './auth/service'

function App() {

  useEffect(() => {
    async function getProducts() {
      const response = await services.getProducts()
      console.log(response)
    }

    getProducts()
  }, [])

  return (
    <>
      <Header />
    </>
  )
}

export default App