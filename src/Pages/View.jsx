import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../Redux/slice/wishlistSlice'
import { addToCart } from '../Redux/slice/cartSlice'

function View() {
  const{id}=useParams()

  const[product,setProduct]=useState({})
  const {wishlist} = useSelector(state=>state.wishlistReducer)
  const cart = useSelector((state)=>state.cartReducer)
  const dispatch =useDispatch()

  useEffect(()=>{
    const allproducts=JSON.parse(localStorage.getItem("allproducts"))
    console.log(allproducts);

    setProduct(allproducts?.find(product=>product?.id==id))
  },[])
 


  console.log(product);


  const handleWishlist=(product)=>{
    const existingProduct = wishlist.find(item=>item.id==product.id)
    if(existingProduct){
      alert("product already exist")
    }else{
      dispatch(addToWishlist(product))
    }
  }
  const handleCart=(product)=>{
    const existingProduct=cart?.find(item=>item.id==product.id)

      if(existingProduct){
        alert("items addedd")
        dispatch(addToCart(product))
      }else{
        alert("item added")
        dispatch(addToCart(product))
      }
    
  }








  return (
    <>
    <Header/>
      <div className="container mt-5 row ms-5">
        <div className="col-lg-4">
          <img src={product?.thumbnail} alt="" />
      </div>
    <div className="col-lg-2"></div>
    <div className="col-lg-6">
      <p>Pid:{product?.id}</p>
      <h1>{product?.title}</h1>
      <p>{product?.description}</p>
      <h3>Price: <span className='text-danger'>${product?.price}</span></h3>
      <div className="d-flex-justify-content-between">
      <Button className='btn btn-light' onClick={()=>handleWishlist(product)}><i class="fa-solid fa-heart text-danger"></i>Wishlist</Button>
      
      <Button className='btn btn-light' onClick={()=>handleCart(product)}><i class="fa-solid fa-cart-plus text-info" ></i>Cart</Button>
      </div>
    </div>
      </div>
    </>
  )
}

export default View
