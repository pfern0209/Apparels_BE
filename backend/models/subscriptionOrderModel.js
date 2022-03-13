import mongoose from 'mongoose'

const subscriptionOrderSchema=mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
      },
        name:{
          type:String,
          required:true
        },
        limit:{
          type:Number,
          required:true
        },
        price:{
          type:Number,
          required:true
        },
      id:{
        type:String
      },
      status:{
        type:String
      },update_time:{
        type:String
      },email_address:{
        type:String
      },
      taxPrice:{
        type:Number,
        required:true,
        default:0.0
      },
      totalPrice:{
        type:Number,
        required:true,
        default:0.0
      },
      isPaid:{
        type:Boolean,
        required:true,
        default:false
      },
      paidAt:{
        type:Date
      }
    },{
      timestamps:true
    })


const subsOrder=mongoose.model('subsOrder',subscriptionOrderSchema)

export default subsOrder