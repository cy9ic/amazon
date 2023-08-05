import React, { useState } from "react";
import "./css/product.css";
import { useStateValue } from "./Stateprovider";


export default function Product({ id, title, image, price, rating }) {
  const [{basket} , dispatch ]  = useStateValue();

  

  
  const addToBasket = ()=>{
    // dispatch into data layer
    dispatch({
      type: 'ADD_TO_BASKET',
      item:{
        id : id, 
        title: title,
        image:image,
        price: price,
        rating:rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}


            
        </div>
      </div>

      <img src={image} alt="" />
      <button onClick={addToBasket} className="product_button">Add to cart</button>
      
    </div>
  );
}


