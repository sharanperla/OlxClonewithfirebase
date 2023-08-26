import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import OlxLogo from '../../assets/OlxLogo'
import Search from '../../assets/Search'
import Arrow from '../../assets/Arrow'
import SellButton from '../../assets/SellButton'
import SellButtonPlus from '../../assets/SellButtonPlus'
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext'
import { auth, docsSnap } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../searchbar/searchbar'

function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  console.log(user)
 
 
  return (
    <div className='headerParentDiv'>
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        {/* <div className="productSearch">
          
          <div className="input">
            <input type="text"
              placeholder='Find car,mobile phone and more...'
            />
          </div>
          <div className="searchAction">
            <Search color='#ffffff' />
          </div>
        </div> */}
        <SearchBar></SearchBar>
        <div className="language">
          <span>ENGLISH</span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span >{user ? `welcome ${user.displayName}` : <span onClick={() => { navigate('/login') }}>Login</span>}</span>
          <hr></hr>
        </div>
        {user && <span onClick={() => {
          auth.signOut();
          navigate('/')
        }}>Logout</span>}
        <div className="sellMenu" onClick={() => {

          navigate('/create')
        }}>
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
