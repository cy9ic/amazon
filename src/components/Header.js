import React, { useState } from "react";
import "./css/header.css";
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingBasket } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useStateValue } from "./Stateprovider";
import { auth } from "../firebase";
import { colors } from "@mui/material";

export default function Header() {

  
  const [{basket , user} , dispatch] = useStateValue();

  const handleAuthetication = ()=>{
    if(user){
      auth.signOut();
    }
  }
  return (
    <div className="header">
      
      <Link to={'/'}> <img
        src="https://static.vecteezy.com/system/resources/previews/019/040/342/original/amazon-logo-editorial-free-vector.jpg "
        alt=""
        className="navbar_logo"
      /></Link>
      <div className="navbar_search">
        <input type="text" className="navbar_search_input" />
        
        <SearchIcon className="header_search_icon"/>
      </div>

      <div className="navbar_options">
        <Link className="sign_link" to={!user && '/login'}>
        <div onClick={handleAuthetication} className="header_option">
                <span className="navbar_option_1">
                    Hello {!user?'Guest':user.email}
                </span>
                <span className="navbar_option_2">
                    {user?'Sign Out':'Sign In'}
                </span>
        </div>
        </Link>
          <Link to='/orders'  className="sign_link">
        <div className="header_option">
        <span className="navbar_option_1">
                    Returns 
                </span>
                <span className="navbar_option_2">
                    &Orders
                </span>
        </div>
                </Link>
        
        <div className="header_option">
        <span className="navbar_option_1">
                    Your
                </span>
                <span className="navbar_option_2">
                    Prime
                </span>
        </div>
      </div>
<Link className="clickable" to={'/checkout'}>
<div className="header_option_basket">
    <ShoppingBasket className="shoppingbasket"/>
    <span className="headerbasketcount">
    {basket?.length}
    </span>
      </div>
</Link>
      



    </div>
  );
}
