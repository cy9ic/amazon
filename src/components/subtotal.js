import React from 'react'
import './css/subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './Stateprovider'
import { getBaskeTotal } from './reducer';

export default function Subtotal() {
  const [{basket}, dispatch] = useStateValue();

  return (
    <div className='subtotal'>
        <CurrencyFormat renderText={(value)=>(
            <>
            <p>
                Subtotal ({basket?.length} Items): <strong>{value}</strong></p>
                
                <small className='subtotal_gift'>
                    <input type="checkbox" /> This order contains a gift
                </small>
                
                </>
                
        
        )}

        decimalScale={2}
        value={getBaskeTotal(basket)}
        displayType={'text'}
        thousandSeparator = {true}
        prefix={"$"}
        />
        
        <button className='subtotal_button'>Proceed to checkout</button>

        

    </div>
  )
}
