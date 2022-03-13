import React from 'react'
import { useState,useEffect } from "react"
import { Link,useNavigate } from "react-router-dom"
import { Card,Row,Col,Image,ListGroup,Button, Form,  } from "react-bootstrap"
import Rating from "../components/Rating"
import {useDispatch,useSelector} from "react-redux"
import { paySubscriptionOrder } from "../actions/orderActions"
import { addToCart } from "../actions/cartActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants"
import { PayPalButton } from "react-paypal-button-v2";
import axios from 'axios'
import imagePath from '../images/Subscription.png'
import { USER_LOGOUT } from '../constants/userConstants'




const PaySellerGoldScreen = () => {

  const name="goldPlan"
  const price=50
  const limit=100


  const navigate=useNavigate();
  
  const dispatch=useDispatch()

  const [sdkReady,setSdkReady]=useState(false)

  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}=userLogin


  useEffect(() => {
    const addPayPalScript=async()=>{
        if(!userInfo){
          navigate('/login')
        }

        const {data:clientId}=await axios.get('/api/config/paypal')
        const script=document.createElement('script')
        script.type='text/javascript'
        script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
        script.async=true
        script.onload=()=>{
          setSdkReady(true)
        }
        document.body.appendChild(script)
      }
    
}, [navigate,userInfo]) 

  const successPaymentHandler=(paymentResult)=>{
    console.log(paymentResult)
    console.log(paymentResult.status)
    if(paymentResult.status==="COMPLETED"){
      dispatch(paySubscriptionOrder({name:name,limit:limit,price:price,id:paymentResult.id,status:paymentResult.status,update_time:paymentResult.create_time,email_address:paymentResult.payer.email_address,isPaid:true},userInfo._id))
      dispatch({type: USER_LOGOUT})
      navigate('/')
    }else{
      console.log("something is wrong")
    }
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">Go Back</Link>
        <>
        <Row>
      <Col md={6}>
        {/* <Image src="https://blog.hotmart.com/blog/2020/07/blog_assinatura_imagem-670x419-1.png" alt="Image" fluid/> */}
        <Image src={imagePath} alt="Image" fluid/>
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>Gold Plan</h3>
          </ListGroup.Item>

          <ListGroup.Item>
            <Rating value="5" text="4 Reviews"/>
          </ListGroup.Item>

          <ListGroup.Item>
            Price: {price}
          </ListGroup.Item>

          <ListGroup.Item>
            Limit: {limit} products
          </ListGroup.Item>

          <ListGroup.Item>
            Description: With this plan you can add 100 products on our platform. Please be sure when you add the products since if you wish to delete or edit the products in case of corrections you will have to contact the admin
          </ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>
                  Price:
                </Col>
                <Col>
                  <strong>{price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  Status:
                </Col>
                <Col>
                  In Stock
                </Col>
              </Row>
            </ListGroup.Item>

            


            <ListGroup.Item>
            <PayPalButton currency="USD" amount={price} onSuccess={successPaymentHandler}/>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      </Row>

      <Row>
        <Col md={6}>
          <h2>Reviews</h2>
          <ListGroup variant='flush'>
              <ListGroup.Item key="1">
                <strong>Preston Fernandes</strong>
                <Rating value="5"/>
                <p>01 January 2022</p>
                <p>Value for money</p>
              </ListGroup.Item>
              <ListGroup.Item key="2">
                <strong>Bruno Fernandes</strong>
                <Rating value="5"/>
                <p>02 January 2022</p>
                <p>Amazing functionality</p>
              </ListGroup.Item>  
              <ListGroup.Item key="3">
                <strong>Joston Fernandes</strong>
                <Rating value="5"/>
                <p>03 January 2022</p>
                <p>Easy to use</p>
              </ListGroup.Item>     
              <ListGroup.Item key="4">
                <strong>Yash Gupta</strong>
                <Rating value="5"/>
                <p>04 January 2022</p>
                <p>Friendly User Interface</p>
              </ListGroup.Item>                           
          </ListGroup>
        </Col>
      </Row>
      </>
      
      

    </>
  )
}

export default PaySellerGoldScreen