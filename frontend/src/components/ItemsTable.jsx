/*
import React, { Component, useEffect, useState } from 'react'
import Item from './Item';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { config } from 'dotenv';


export default function ItemsTable()
{  
    const [items,setItems] = useState([]);
    const [delete_status, setDeleteStatus] = useState(0);
    const history = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('token'))
        return history('/login');

        const getAllItems = async () => {
            const config= {
                headers: {
                    "Content-type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            try
            {
                const response= await axios.get('http://localhost:5000/api/itemexpenses/',config);
                if(response)
                {
                    setItems(response.data);
                    setDeleteStatus(0);
                }
                console.log(response.data)
            }
            catch(err){
                console.log(err);
            }
        }
        getAllItems();
    },[delete_status])

    const handleDelete = async (id) => {
        const config ={
            headers: {
                "contentType":"application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        try {
            const response= await axios.delete(`http://localhost:5000/api/itemexpenses/${id}`, config)
            if(response){
                setDeleteStatus(1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            {items.map(i => <Item key={i._id} id={i._id} desc={i.description} amt={i.amount} handleDelete={handleDelete}/>)}
        </div>
    )
    
}
*/