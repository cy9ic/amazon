import React from 'react'
import './css/checkout.css'
import Subtotal from './subtotal'
import CheckoutProduct from './checkoutproduct'
import { useStateValue } from './Stateprovider'

export default function Checkout() {
  const [{basket, user}, dispatch] = useStateValue();
  return (
    <div className='checkout'>
        <div className="checkout_left">
            
            <img className='checkout_ad' src="https://influencermarketinghub.com/wp-content/uploads/2021/11/Amazon-Display-Ad-Amazon-1024x140.jpg" alt="" />
      <h3 className='user_email'>{user?.email}</h3>
        <h2 className='checkout_title'> Your Shopping Basket :</h2>
      
    {basket.map((item,index) =>(
      <CheckoutProduct 
      key={index}
      image ={item.image} title={item.title} price={item.price} rating={item.rating} id={item.id}/>
    ))}
        </div>
        <div className='checkout_right'>
            <Subtotal/>
        </div>
    </div>
  )
}
