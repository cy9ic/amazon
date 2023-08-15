import './App.css';
import Header from './components/Header';
import Homepage from './components/Homepage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Checkout from './components/checkout';
import Loginpage from './components/loginpage';
import { useEffect } from 'react';
import { auth } from './firebase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useStateValue } from './components/Stateprovider';
import Payment from './payment';

function App() {

  const promise = loadStripe(

    'pk_test_51NcUJLSICw1qJQkeZ4LASvKvJU8QO5u7Xhe2T3M4GM2vVbuR9qqE0b9iCZOnUNhgoNwgrQr4GLEqfYC8pMNhwwSn00nRM2IESp');

  const [{}, dispatch] = useStateValue();

  useEffect(()=>{
auth.onAuthStateChanged(authUser =>{
  
  if(authUser){
//the user is or was logged in 
dispatch({
  type: 'SET_USER',
  user: authUser
  
})
  }else{
// the user is logged out
dispatch({
  type: 'SET_USER',
  user: null
  
})
  }
})
  },[])
  return (
    //We will use BEM convention
    
    <Router>
    <div className='app'>
    
     <Routes>

      <Route path='/login' element={
        <>
        <Loginpage></Loginpage></>
      }/>

    
      <Route path='/checkout' element={<div>
        <Header/>    
        <Checkout/>
      </div>}/>

     <Route path='/' element={<div>
      <Header/>
        <Homepage/>
      </div>}/>

      <Route path='/payment' element={
        <>
        <Header/>
        <Elements stripe={promise}>        <Payment/></Elements>
        </>
      }></Route>

    
     
     </Routes>

    
     
    </div>
    </Router>
  );
}

export default App;
