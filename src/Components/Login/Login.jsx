import React, { useContext, useState } from 'react'
import './Login.css'
import { FirebaseContext } from '../../store/FirebaseContext'
import {  signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate=useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {}=useContext(FirebaseContext)
  const handleSubmit= async (e)=>{
    e.preventDefault()
    try{ 
      await signInWithEmailAndPassword(auth,email,password).then(()=>{
      alert('logged in')
      navigate("/")
    })
  } catch (err) {
    console.error(err);
    alert(err.message);
  }


  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src='/images/olx-logo.png'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
          onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="pass">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a href='/Signup'>Signup</a>
      </div>
    </div>
  )
}

export default Login
