import React from 'react'
import moment from 'moment/moment'
import CheckoutProduct from './checkoutproduct'
import { CloseFullscreen } from '@mui/icons-material'
import CurrencyFormat from 'react-currency-format'
import './css/order.css'
function Order({order}) {
    
  return (
    <div className='order'>

        <h2>Order</h2>


    <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
    <p className='order_id'>
        <small>{order.id}</small>
    </p>
    {order.data.basket?.map((item,i)=>(
        <CheckoutProduct 
        key={i}
        image={item.image}
        id={item.id}
        title={item.title}
        price={item.price}
        rating={item.rating}
        hideproduct = {true}
        />
    ))}
<CurrencyFormat
    renderText={(value)=>(
        <h3 className='order_total'>Order total : {value}</h3>
    )}


    decimalScale={2}
    value={order.data.amount /100}
    displayType='text'
    thousandSeparator  = {true}
    prefix={'$'}
></CurrencyFormat>



    </div>

  )
}

export default Order