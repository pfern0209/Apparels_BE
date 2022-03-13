import subsOrder from "../models/subscriptionOrderModel.js";
import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";

//@desc Create new subscription order
//@route POST /api/orders/subscription/:id
//@access Private Route
const addSubscriptionOrder=asyncHandler(async(req,res)=>{
    const{name,limit,price,id,status,update_time,email_address,taxPrice,totalPrice,isPaid}=req.body
  
    if(!isPaid){
      res.status(400)
      throw new Error("Payment Unsuccessful")
      return
    }else{
      const subOrder=new subsOrder({
        user:req.params.id,
        name,
        limit,
        price,
        id,
        status,
        update_time,
        email_address,
        taxPrice,
        totalPrice,
        isPaid,
        paidAt:Date.now()
      })
      const createdSubOrder=await subOrder.save()
      let user=await User.findById(req.params.id)
      let updatedUser=user
      if(createdSubOrder && user){
        user.isSeller=true
        user.maxProducts=limit
        updatedUser=await user.save()
      }else{
          throw new Error("Something went wrong")
      }
      res.json(updatedUser)
    }
  })

  export {addSubscriptionOrder}