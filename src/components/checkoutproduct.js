import React from 'react'
import './css/checkoutproduct.css'
import { useStateValue } from './Stateprovider'
export default function CheckoutProduct({image,title,price,rating,id}) {
  const [{basket}, dispatch] = useStateValue()
  const RemoveFromBasket = ()=>{
    console.log()
    dispatch({
      type:'REMOVE_FROM_BASKET',
      id:id,
    })
  }
  return (
    
    <div className='checkoutproduct'>
    
    <img src={image} alt=""  className='checkoutimage'/>
    <div className='checkoutproduct_info'>
        <p className='checkout_product_title'>{title}</p>
        <p className='checkout_product_price'>
        <small>$</small>
        <strong>{price}</strong>
        </p>
        <div className='product_stars'>
            
                 {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        <button onClick={RemoveFromBasket}>
            Remove from basket
        </button>
    </div>
    </div>

    
  )
}
