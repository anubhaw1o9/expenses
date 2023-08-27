import { useItemexpensesContext } from "../hooks/useItemexpensesContext"
import { useAuthContext } from "../hooks/useAuthContext"

const ItemexpenseDetails = ({ itemexpense}) => {
    const {dispatch} = useItemexpensesContext()
    const { user } = useAuthContext()

    const handleClick = async () => {

        if(!user){
            return
        }
        const response = await fetch('http://localhost:5000/api/itemexpenses/' + itemexpense._id, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({type: 'DELETE_ITEMEXPENSE', payload: json})
        }
    }
    return (
        <div className="itemexpense-details">
            <h4>{itemexpense.description}</h4>
            <p>amount:{itemexpense.amount}</p>
            <p>type:{itemexpense.expensetype}</p>
            <p>{itemexpense.createdAt}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default ItemexpenseDetails;