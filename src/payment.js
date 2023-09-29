import React, { useEffect, useState } from 'react'
import { useStateValue } from './components/Stateprovider'
import CheckoutProduct from './components/checkoutproduct';
import { Link ,useNavigate } from 'react-router-dom';
import './components/css/payment.css'
import { useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { CardElement } from '@stripe/react-stripe-js';
import { getBaskeTotal } from './components/reducer';
import { db } from './firebase';
import instance from './axios';
import { dblClick } from '@testing-library/user-event/dist/click';
export default function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const element = useElements();
    const [error, setError] = useState(null)
    const [processing , setProcessing ] = useState("")
    const [succeded , setSucceded ] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret , setClient] = useState(null)
    const history = useNavigate();
    const stripe = useStripe(); 

    useEffect(()=>{
            
            const getClientSecret = async ()=>{
                const response = await instance({
                    method:'post',
                    url:`/payments/create?total=${getBaskeTotal(basket)*100}`
                });
                
                setClient(response.data.clientSecret)
                
            }
            getClientSecret();
            console.log("Running")
        
        },[basket])





        
        const handleSubmit = async (e)=>{

        e.preventDefault()
        setProcessing(true)
        
    
        const payload = await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: element.getElement(CardElement),
            billing_details: {
              name: 'Jenny Rosen',
              address: {
                line1: '1 Main street',
                city: 'San Francisco',
                postal_code: '90210',
                state: 'CA',
                country: 'US',
              },
            },
          },
          shipping: {
            name: 'Jenny Shipping',
            address: {
              line1: '1 Main street',
              city: 'San Francisco',
              postal_code: '90210',
              state: 'CA',
              country: 'US',
            },
            
          },
        }
            ).then(({paymentIntent})=>{
                // paymentIntenet = payment confirmation
                db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket:basket,
                    amount:paymentIntent.amount,
                    created:paymentIntent.created
                })
                setSucceded(true);
                setError(null);
    
                
                setProcessing(false);
                dispatch({
                    type :"EMPTY_BASKET"
                })
                
                history('/orders')
                
            })
            
        }

       

    const handleChange = e =>{
        // Listen to changes in the card element.
        // And display any errors as the customers types their card details.
        setDisabled(e.empty);
        setError(e.error ? e.error.message:"")
    }
  return (

    
    <div className="page">
    <div className='payment'>


        
        <div className='payment_container'>
            <h1>
                Checkout (<Link to={'/checkout'}>
             {basket?.length}  Items</Link>)
            </h1>
            
            <div className="payment_section">

                
                    <div className="payment_title">
                        <h3>Delivery Address : </h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                    <p>  324 , DMC</p>
                    <p> 38-west , Chandigarh</p>
                    </div>
                    
                



            </div>

            <div className="payment_section">
                <div className="payment_title">
                    <h3>Review item and delivery : </h3>
                </div>
                <div className="payment_items">
                     {basket.map((item,index) =>( 
                     <CheckoutProduct key={index} image ={item.image} title={item.title} price={item.price} rating={item.rating} id={item.id}/>))}
                </div>
            </div>

            <div className="payment_section">
                <div className="payment_title">
                    <h3>Payment Method : </h3>

                </div>
                <div className="payment_details">
                    {/* Stripe */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}>

                        </CardElement>
                        <div className="payment_pricecontainer">
                            <CurrencyFormat 
                            renderText = {(value)=>(
                                <h3>Order Total: {value}</h3>)}

                            decimalScale={2}
                            value={getBaskeTotal(basket)}
                            displayType='text'
                            thousandSeparator={true}
                            prefix='$'
                            />

                            <button className='payment_button'  disabled={processing || disabled || succeded}>
                                <span>{processing? <p>Processing</p>:"Buy Now"}</span>
                            </button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>

        </div>

    </div>

    </div>
        
    
  )
}
