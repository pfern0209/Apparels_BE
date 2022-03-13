import React from 'react'
import { useState,useEffect } from "react"
import { Link,useParams,useNavigate } from "react-router-dom"
import { Card,Row,Col,Image,ListGroup,Button, Form,  } from "react-bootstrap"
import Rating from "../components/Rating"
import {useDispatch,useSelector} from "react-redux"
import { listProductDetails, createProductReview } from "../actions/productActions"
import { addToCart } from "../actions/cartActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants"
import { PayPalButton } from "react-paypal-button-v2";
import imagePath from '../images/Subscription.png'



const PaySellerDiamondScreen = () => {

  const successPaymentHandler=(e)=>{
    console.log("Hello")
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
            <h3>Diamond Plan</h3>
          </ListGroup.Item>

          <ListGroup.Item>
            <Rating value="5" text="4 Reviews"/>
          </ListGroup.Item>

          <ListGroup.Item>
            Price: 51
          </ListGroup.Item>

          <ListGroup.Item>
            Limit: 20 products
          </ListGroup.Item>

          <ListGroup.Item>
            Description: With this plan you can add 20 products on our platform. Please be sure when you add the products since if you wish to delete or edit the products in case of corrections you will have to contact the admin
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
                  <strong>20</strong>
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
            <PayPalButton currency="USD" amount="50" onSuccess={successPaymentHandler}/>
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

export default PaySellerDiamondScreen