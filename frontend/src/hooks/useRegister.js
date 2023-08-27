import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsloading] = useState(null)
    const { dispatch } = useAuthContext()

    const register = async (email, password) => {
        setIsloading(true)
        setError(null)

        const response =await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()
        if (!response.ok) {
            setIsloading(false)
            setError(json.error)
        }
        if (response.ok) {
           //save the user to local storage
           localStorage.setItem('user', JSON.stringify(json)) 

           //update the auth context
           dispatch({type: 'LOGIN', payload: json})
           setIsloading(false)

        }
    }

    return { register, isLoading, error}
}