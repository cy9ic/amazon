import React, { useState } from 'react'
import './css/login.css'
import { Link   } from 'react-router-dom'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'


export default function Loginpage() {
  const history = useNavigate();
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const signin = e=>{
    e.preventDefault();

    

    // Firebase Login now
    auth.signInWithEmailAndPassword(email , password)
    .then(auth=>{
      history('/')
    }).catch(error=>{
      alert(error);

    })
    
  }
  const register=()=>{
    auth.createUserWithEmailAndPassword(email,password)
    .then((auth)=>{
      console.log(auth)
    })
    .catch(error=>(alert(error.message)))
    if(auth){
      history('/')
    }
  }

  return (
    <div className='login'>
        <Link to='/'>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" alt="" className='login_image'/>
</Link>
<div className='login_container'>
    <h2 className='login_heading'>Sign-in</h2>
    <form action="" className='formm'>
        <label htmlFor="email">Email or mobile phone number </label>
        
        <input type="email" value={email}  onChange={e => setemail(e.target.value)}/>

        <label htmlFor="password" >Password</label>
        
        <input type="password"  value={password}  onChange={e => setpassword(e.target.value)}/>
        <button className='loginbutton' type='submit' onClick={signin}>Sign in</button>
    </form>

    <p className='loginpara'>By continuing, you agree to Amazon's FAKE CLONE <span className='terms'>Conditions of Use and Privacy Notice </span>.
</p>
<div>
<input type="checkbox" /> 
<span> Keep me signed in.</span>

<hr className='hr' />
</div>
<button className='create' onClick={register}>Create Your Amazon Account</button>
</div>

    </div>
  )
}
