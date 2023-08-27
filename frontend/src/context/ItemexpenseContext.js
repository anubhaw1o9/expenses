import { createContext, useReducer } from "react";

export const ItemexpensesContext = createContext()

export const itemexpensesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ITEMEXPENSES':
            return {
                itemexpenses: action.payload
            }
        case 'CREATE_ITEMEXPENSE':
            return {
                itemexpenses: [action.payload, JSON.stringify(state.itemexpenses)]
            }
        case 'DELETE_ITEMEXPENSE':
            return {
                itemexpenses: state.itemexpenses.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ItemexpensesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(itemexpensesReducer, {
      itemexpenses: null  
    })

    return (
        <ItemexpensesContext.Provider value={{...state, dispatch}}>
            {children}
        </ItemexpensesContext.Provider>
    )
}