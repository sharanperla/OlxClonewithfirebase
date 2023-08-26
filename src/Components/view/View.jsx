import React, { useContext, useEffect, useState } from 'react'
import "./View.css"
import { PostContext } from '../../store/PostCotext'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config';
function View() {
  const [userDetails,setUserDetails]=useState()
  const {postDetails}=useContext(PostContext)


useEffect(()=>{
  const {userId}=postDetails
  const q = query(collection(db, "users"), where("id", "==", userId));
  const querySnapshot =  getDocs(q).then((res)=>{
    res.forEach(doc=>{
      setUserDetails(doc.data())
    })
  })
})
  return (
      <div className="viewParentDiv">
      <div className="imageShowDiv">
      
        <img
          src={postDetails.url}
          alt=""
        />
      
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.productname}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.crreatedAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
}
      </div>
    </div>
    
  )
}

export default View
