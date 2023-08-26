import React, { useContext, useState } from 'react'
import './Signup.css'
import { FirebaseContext } from '../../store/FirebaseContext'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { collection, addDoc } from "firebase/firestore";
import { NavLink, useNavigate } from 'react-router-dom';
function Signup() {
  const navigate = useNavigate(); 
  const [userName, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { firebase } = useContext(FirebaseContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{

     await createUserWithEmailAndPassword(auth, email, password).then((result) => {
        const user = result.user
        const setUsername=result.user
        result.user.displayName = userName
        navigate("/login")
        
        const docRef =  addDoc(collection(db, "users"), {
          id: result.user.uid,
          username: userName,
          phone: phone
        })
      })
    }catch (err) {
      console.error(err);
      alert(err.message);
    }
  }


return (
  <div>
    <div className="signupParentDiv">
      <img width="200px" height="200px" src='/images/olx-logo.png'></img>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">Username</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          name="name"

        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          className="input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"

        />
        <br />
        <label htmlFor="phone">Phone</label>
        <br />
        <input
          className="input"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          id="phone"
          name="phone"

        />
        <br />
        <label htmlFor="pass">Password</label>
        <br />
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="pass"
          name="password"

        />
        <br />
        <br />
        <button>Signup</button>
      </form>
      <a href='/Login'>Login</a>
    </div>
  </div>
)
}

export default Signup
