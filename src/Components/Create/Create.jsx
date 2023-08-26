import React, { useContext, useState } from 'react'
import './Create.css'
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref,getDownloadURL, uploadBytes } from "firebase/storage";
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

function Create() {
  const date=new Date()
  const navigate = useNavigate(); 
  const storage=getStorage();
  const [productName,setProductName]=useState('');
const [category,setCategory]=useState('');
const [price,setPrice]=useState('');
const [image,setImage]=useState(null);
const {user}=useContext(AuthContext)
const {firebase}=useContext(FirebaseContext)
const metadata = {
  contentType: 'image/',
};
const handleSubmit=(e)=>{
  e.preventDefault()
const imageref=ref(storage ,`/image/${image.name}`)
try{
uploadBytes(imageref,image,metadata).then((ref)=>{
  getDownloadURL(imageref).then((url)=>{
    addDoc(collection(db,'products'),{
      productname:productName,
      category:category,
      price:price,
      url:url,
      userId:user.uid,
      crreatedAt:date.toDateString()
    })
navigate('/')
alert('added')
  })
})
}catch (err) {
  console.error(err);
  alert(err.message);
}
}
  return (
   
  
      <div className="centerDiv">
        
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={productName}
            onChange={(e)=>setProductName(e.target.value)}
            name="Name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input 
          className="input" 
          type="number" 
          id="fname" 
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
          name="Price" />
          <br />
     
        <br />
        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}
          ></img>
     
          <br />
          <input onChange={(e)=>{
            setImage(e.target.files[0])
            }} type="file" />
          <br />
          <button onClick={handleSubmit}  className="uploadBtn">upload and Submit</button>
          <span onClick={()=>{navigate('/')}}  className="goback">Back to home</span>
      </div>


  )
}

export default Create
