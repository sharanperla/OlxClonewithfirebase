import React, { useContext, useEffect, useState } from 'react'
import Heart from '../../assets/Heart'
import './Post.css'
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext'
import { PostContext } from '../../store/PostCotext'
import { getFirestore, collection, getDocs, doc ,addDoc} from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Await, useNavigate } from 'react-router-dom'
import { db, docsSnap, recommendations } from '../../firebase/config'

function Post() {
  const {user}=useContext(AuthContext);
  const navigate = useNavigate();
  const { setPostDetails } = useContext(PostContext)
  const [products, setProducts] = useState([])
  const [recitems, setRecitems] = useState([])
  docsSnap.forEach(doc => {
    console.log(doc.data());
  })

  useEffect(() => {

    const posts = docsSnap.docs.map((product) => {
      return {
        ...product.data(),
        id: products.id
      }
    })
    setProducts(posts)
    console.log(products)
  }, [])

  useEffect(() => {

    const recs = recommendations.docs.map((product) => {
      return {
        ...product.data(),
        id: products.id
      }
    })
    setRecitems(recs)
    console.log(recitems)
  }, [])
  const [isActive, setIsActive] = useState(false);


  return (
    <div className='postParentDiv'>
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>

        <div className="cards">
          {products.map(product => {
            { console.log(product.url) }
            return <div className="card" onClick={() => {
              setPostDetails(product)
              navigate('/view')
            }}>
                <div className="favorite"  >
                <div className='heart' style={{
          backgroundColor: isActive ? 'red' : '',
          color: isActive ? 'white' : '',
        }} onClick={(e)=>{
                  e.preventDefault()
                    e.stopPropagation();
                    setIsActive(current => !current);
                    addDoc(collection(db,'favorite'),{
                      productname:product.productname,
                      category:product.category,
                      price:product.price,
                      url:product.url,
                      userId:user.uid,
                      createdAt:product.crreatedAt
                      
                    })
              navigate('/')
              alert('added to favorite list')
              }}>
                <Heart />

                </div>
              </div>
              <div className="image">
                <img src={product.url} alt="image" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.productname}</p>
              </div>
              <div className="date">
                <span>{product.crreatedAt}</span>
              </div>
            </div>
          })
          }

        </div>
      </div>


      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {recitems.map(rec => {
            { console.log(rec.url) }
         return <div className="card">
              <div className="favorite" onClick={(e)=>{
                  e.preventDefault()
                    e.stopPropagation();
                    addDoc(collection(db,'favorite'),{
                      productname:rec.productname,
                      category:rec.category,
                      price:rec.price,
                      url:rec.url,
                      userId:user.uid,
                      createdAt:rec.crreatedAt
                      
                    })
              navigate('/')
              alert('added to favorite list')
              }}>
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={rec.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {rec.price}</p>
                <span className="kilometer">{rec.category}</span>
                <p className="name">{rec.productname}</p>
              </div>
              <div className="date">
                <span>{rec.crreatedAt}</span>
              </div>
            </div>
          })
          }

        </div>
      </div>
    </div>
  )
}


export default Post
