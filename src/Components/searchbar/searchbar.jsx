import React, { useState } from 'react';
import { getFirestore, getDocs, collection, where, query } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import './searchbar.css'
import Search from '../../assets/Search';

const SearchBar = () => {

    const [Query, setQuery] = useState("")
    const [results, setResults] = useState([])
    async function search(e){
        e.preventDefault()
        const inputValue = e.target.value;
        setQuery(e.target.value)
        const firebaseConfig = { apiKey: "AIzaSyDTGNOScA6kvkiPOufFAsjFD-QRkjnYMdY",
        authDomain: "olxclone-6fbf9.firebaseapp.com",
        projectId: "olxclone-6fbf9",
        storageBucket: "olxclone-6fbf9.appspot.com",
        messagingSenderId: "722526584596",
        appId: "1:722526584596:web:2e2c917a1da7fd885d8c01",
        measurementId: "G-G47X8G3LL8"}


        if(inputValue.length>0){ 
        const app = initializeApp(firebaseConfig)
        
        let db = getFirestore(app)
        
        const collection_ref = collection(db, 'products')

            const q = query(collection_ref, where('productname', '>=',  inputValue));
            console.log(inputValue)
            const doc_refs = await getDocs(q)
            
            const res = []
            
            doc_refs.forEach(country => {
                res.push({
                    id: country.id, 
                    ...country.data()
                })
            })
            
            setResults(res)
            console.log(results)
        }
    
}
var loginButton;
if (results !=null) {
   loginButton= results.map(item=>  
        <><div className='item' >{item.productname}</div></>
    
)
} else {
  loginButton ='';
}



    return (
        <div className='searchdiv'>
        <div className="productSearch">
            <input
                type="text"
                className="input"
                placeholder="Find car,mobile phone and more..."
                onChange={search}
                value={Query}
            />
           
           <div className="searchAction">
            <Search color='#ffffff' />
          </div>
  
        </div>
          <div className='searchlist'>{loginButton}</div>
        </div>
    );
};

export default SearchBar;