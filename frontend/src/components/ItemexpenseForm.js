import { useState } from "react"
import { useItemexpensesContext } from "../hooks/useItemexpensesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ItemexpenseForm = () => {
    const {dispatch} = useItemexpensesContext()
    const { user } = useAuthContext()
   
   const [amount, setAmount] = useState('') 
   const [transactiondate, setTransactiondate] = useState('') 
   const [description, setDescription] = useState('')
   const [expensetype, setExpensetype] = useState('')
   const [error, setError] = useState(null)
   
   const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user){
        setError('u must be logged in')
        return
    }

    const itemexpense ={amount, transactiondate, description, expensetype}
    const response = await fetch('http://localhost:5000/api/itemexpenses', {
        method: 'POST',
        body: JSON.stringify(itemexpense),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })
    const json = await response.json()

    if (!response.ok) {
        setError(json.error)
    }
    if (response.ok) {
        setAmount('')
        setTransactiondate('')
        setDescription('')
        setExpensetype('')
        setError(null)
        console.log('new itemexpense added', json)
        dispatch({type: 'CREATE_ITEMEXPENSE', payload: json})
    }
   }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Itemexpense</h3>
            <input type="text" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} value={amount}/>
            <input type="text" placeholder="transactiondate" onChange={(e) => setTransactiondate(e.target.value)} value={transactiondate}/>
            <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description}/>
            <input type="text" placeholder="Expensetype" onChange={(e) => setExpensetype(e.target.value)} value={expensetype}/>
            <button>Add Itemexpense</button>
            {error && <div className="error">{error}</div>} 
        </form>
   ) 
}

export default ItemexpenseForm;