import React, { useEffect, useState } from 'react'
import './Banner.css'
import Arrow from '../../assets/Arrow'
import { docsSnap } from '../../firebase/config'


function Banner() {
  const [category,setCategory]=useState([])
  const [active,setActive]=useState(true)
useEffect(() => {

  const recs = docsSnap.docs.map((product) => {
    return {
      ...product.data(),
      id: product.id
    }
  })
  setCategory(recs)
  
}, [])


  return (
    <div className='bannerParentDiv'>
      <div className="bannnerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow>
             </div>
             {category.map(product => {
            return <div className="otherQuickOptions">
            <span>{product.category}</span>
            
          </div>
             })
            }
        </div>
        <div className="banner">
          <img src="/images/banner copy.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Banner
