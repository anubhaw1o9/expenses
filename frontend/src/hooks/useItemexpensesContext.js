import {ItemexpensesContext} from '../context/ItemexpenseContext'
import { useContext } from 'react'

export const useItemexpensesContext = () => {
    const context = useContext(ItemexpensesContext)
    
    if(!context) {
        throw Error('useItemexpansesContext must be used inside an ItemexpansesProvider')
    }
    return context
}