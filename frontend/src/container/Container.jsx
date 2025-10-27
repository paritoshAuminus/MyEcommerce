import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {

    const status = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    
    // if (status === false) {
    //     navigate('/login')
    // }

    return children
}

export default ProtectedRoute