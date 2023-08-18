import React, { useEffect, useState } from 'react'
import { useStateValue } from './components/Stateprovider'
import CheckoutProduct from './components/checkoutproduct';
import { DashboardSharp, InsertEmoticon } from '@mui/icons-material';
import { Link ,useNavigate } from 'react-router-dom';
import './components/css/payment.css'
import { useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { CardElement } from '@stripe/react-stripe-js';
import { getBaskeTotal } from './components/reducer';
import axios from 'axios';
export default function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const element = useElements();
    const [error, setError] = useState(null)
    const [processing , setProcessing ] = useState("")
    const [succeded , setSucceded ] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret , setClient] = useState(true)
    const history = useNavigate();

    useEffect(()=>{
            // to charge the user
            const getClientSecret = async ()=>{
                const response = await axios({
                    method:'post',
                    url:`/payments/create?total =${getBaskeTotal(basket)*100}`
                });
                setClient(response.data.clientSecret)
            }
            getClientSecret();
    },[basket])

    const stripe = useStripe();
    const handleSubmit = async (e)=>{

        e.preventDefault()
        setProcessing(true)
        const payload = await stripe.confirmCardPayment(clientSecret,{payment_method:{
            card : element.getElement(CardElement)
        }}).then(({paymentIntent})=>{
            //paymentIntenet = payment confirmation
            setSucceded(true);
            setError(null);
            setProcessing(false);
            history("/orders")
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

                            <button disabled={processing|| disabled || succeded}>
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
