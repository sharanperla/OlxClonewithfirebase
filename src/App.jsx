import React, { useContext, useEffect } from 'react'
import Home from './Pages/Home'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import { AuthContext, FirebaseContext } from './store/FirebaseContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'
import CreatePage from './Pages/CreatePage'
import Viewpost from './Pages/Viewpost'
import Post from './store/PostCotext'

// **********************

function App() {
  const {user,setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)

  function onAuthStateChanged(user){
    setUser(user)
  }
  auth.onAuthStateChanged(onAuthStateChanged);
//   useEffect(()=>{auth.onAuthStateChanged((user)=>{
//   setUser(user)
// })
//   })
    return (
    <div>
<Post>

      <Router>
          <Routes>

        <Route path='/' Component={Home}/>
        <Route Component={SignupPage} path='/Signup'/>
        <Route Component={LoginPage} path='/login'/>
        <Route Component={CreatePage} path='/create'/>
        <Route Component={Viewpost} path='/view'/>
       
        </Routes>
      </Router>
        
</Post>
    </div>
  )
}


export default App
