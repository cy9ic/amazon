import React,{useEffect, useState} from 'react'
import "./css/orders.css"
import { db } from '../firebase'
import { useStateValue } from './Stateprovider'
import Order from './order'

function Orders() {
    const [Orders, setOrders] = useState([])
    const [{basket , user},dispatch] = useStateValue();

    useEffect(()=>{

        if(user){
        db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created','desc')
        .onSnapshot(snapshot=>(
            setOrders(snapshot.docs.map(doc=>({
                
                id:doc.id,
                data:doc.data()
            })))
        ))

        }
        else{
            setOrders([])
        }
    },[user])
  return (
    <div className='orders'>

        <h1>Your Orders</h1>

        <div className='orders_order'>
            {Orders?.map((order,i)=>(
                <Order key={i} order={order}></Order>
            ))}
        </div>
        
    </div>
  )
}

export default Orders