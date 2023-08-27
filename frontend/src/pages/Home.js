import { useEffect } from "react";
import { useItemexpensesContext } from "../hooks/useItemexpensesContext";
import { useAuthContext } from "../hooks/useAuthContext";
//components
import ItemexpenseDetails from '../components/ItemexpenseDetails'
import ItemexpenseForm from '../components/ItemexpenseForm'

const Home = () => {
  const {itemexpenses, dispatch} = useItemexpensesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchItemexpenses = async()=>{
      const response = await fetch('http://localhost:5000/api/itemexpenses',{
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_ITEMEXPENSES', payload: json})
      }
    }

    if (user){
      fetchItemexpenses() 
    }
    
  }, [dispatch, user])

  return(
    <div className="home">
        <h2>Home</h2>
        <div className="itemexpenses">
          {itemexpenses && itemexpenses.map((itemexpense) => (
            <ItemexpenseDetails key={itemexpense._id} itemexpense={itemexpense}/>
          ))}
        </div>
        <ItemexpenseForm />
    </div>
  )  
}

export default Home;