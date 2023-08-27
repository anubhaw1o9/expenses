import  { useState } from "react";
import axios from 'axios';
import { useLogin } from "../hooks/useLogin";

export default function Login()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        /**/ 
        await login(email, password)
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {email,password});
            const token = response.data.token;
            if(response){
                localStorage.setItem("token", token);
                //redirect to dashboard page
            } 
        } catch (error) {
            console.log()
        } 
        
    }
return(
    
        <form className="login" onSubmit={handleSubmit}>
            <input type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
   
);
}