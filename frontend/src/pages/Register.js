import  { useState } from "react";
import axios from 'axios';
import { useRegister } from "../hooks/useRegister";


export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {register, error, isLoading} = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await register(email, password)   

    
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {email,password});
        const token = response.data.token;
        if(response){
            localStorage.setItem("token", token);
            
        }
    } catch (error) {
        console.log()
    }
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h3>Register</h3>
      
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />

      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

