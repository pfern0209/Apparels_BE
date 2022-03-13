import Product from "../models/productModel.js";
import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";

//@desc Auth the user and get token
//@route POST /api/users/login
//@access Public Route
const authUser=asyncHandler(async(req,res)=>{
  const {email,password}=req.body
  const user=await User.findOne({email})

  if(user && (await user.matchPassword(password))){
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      isSeller:user.isSeller,
      maxProducts:user.maxProducts,
      productsAdded:user.productsAdded,
      token: generateToken(user._id)
    })
  }else{
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

//@desc Register a new user
//@route POST /api/users
//@access Public Route
const registerUser=asyncHandler(async(req,res)=>{
  const {name,email,password}=req.body
  const userExists=await User.findOne({email})

  if(userExists){
    res.status(400)
    throw new Error("User already exists")
  }

  const user=await User.create({
    name,
    email,
    password
  })

  if(user){
    res.status(201).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      isSeller:user.isSeller,
      maxProducts:user.maxProducts,
      productsAdded:user.productsAdded,
      token: generateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error("Invalid user data")
  }
})

//@desc Get user profile
//@route GET /api/users/profile
//@access Private Route
const getUserProfile=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user._id)

  if(user){
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      isSeller:user.isSeller,
      maxProducts:user.maxProducts,
      productsAdded:user.productsAdded


    })
  }else{
    res.status(404)
    throw new Error("User not found")
  }
})

//@desc update user profile
//@route PUT /api/users/profile
//@access Private Route
const updateUserProfile=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user._id)

  if(user){
    user.name=req.body.name ||user.name
    user.email=req.body.email ||user.email
    
    // user.maxProducts=req.body.maxProducts ||maxProducts
    // user.productsAdded=req.body.productsAdded|| productsAdded
    if(req.body.password){
      user.password=req.body.password
    }
    const updatedUser=await user.save();

    res.json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      isAdmin:updatedUser.isAdmin,
      isSeller:updatedUser.isSeller,
      // maxProducts:user.maxProducts,
      // productsAdded:user.productsAdded,
      token: generateToken(updatedUser._id)
    })

  }else{
    res.status(404)
    throw new Error("User not found")
  }
})


//@desc Get all users
//@route GET /api/users
//@access Private/ Admin
const getUsers=asyncHandler(async(req,res)=>{
  const users=await User.find({})

  res.json(users)
})

//@desc Delete user
//@route DELETE /api/users/:id
//@access Private/ Admin
const deleteUser=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.params.id)

  if(user){
    await user.remove()
    res.json({message:'User removed'})
  }else{
    res.status(404)
    throw new Error("User not found")
  }
})

//@desc Get user by ID
//@route GET /api/users/:id/edit
//@access Private/ Admin
const getUserById=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.params.id).select('-password')

  if(user){
  res.json(user)
  }else{
    throw new Error("User not found")
  }
})


//@desc update user 
//@route PUT /api/users/:id
//@access Private Admin
const updateUser=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.params.id)

  if(user){
    user.name=req.body.name ||user.name
    user.email=req.body.email ||user.email
    user.maxProducts=req.body.maxProducts ?? maxProducts
    user.productsAdded=req.body.productsAdded ?? productsAdded
    user.isAdmin = req.body.isAdmin ?? user.isAdmin
//Added seller toggle
    user.isSeller=req.body.isSeller ?? user.isSeller

    const updatedUser=await user.save();

    res.json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      isAdmin:updatedUser.isAdmin,
      isSeller:updatedUser.isSeller,
      maxProducts:user.maxProducts,
      productsAdded:user.productsAdded,
    })

  }else{
    res.status(404)
    throw new Error("User not found")
  }
})


// //@desc update user profile
// //@route PUT /api/users/profile
// //@access Private Route
// const updateUserProductsAdded=asyncHandler(async(req,res)=>{
//   const user=await User.findById(req.user._id)

//   if(user){
//     user.name=req.body.name ||user.name
//     user.email=req.body.email ||user.email
    
//     // user.maxProducts=req.body.maxProducts ||maxProducts
//     // user.productsAdded=req.body.productsAdded|| productsAdded
//     if(req.body.password){
//       user.password=req.body.password
//     }
//     const updatedUser=await user.save();

//     res.json({
//       _id:updatedUser._id,
//       name:updatedUser.name,
//       email:updatedUser.email,
//       isAdmin:updatedUser.isAdmin,
//       isSeller:updatedUser.isSeller,
//       // maxProducts:user.maxProducts,
//       // productsAdded:user.productsAdded,
//       token: generateToken(updatedUser._id)
//     })

//   }else{
//     res.status(404)
//     throw new Error("User not found")
//   }
// })

//@desc update seller to false 
//@route PUT /api/users/reset/:id
//@access Auto
const toggleSellerFalse=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.params.id)
  const sellerProducts= await Product.find({"user":[req.params.id]})
  let temp= await User.findById(req.params.id)
  let updatedProduct= await User.findById(req.params.id)

  if(user && sellerProducts){
    user.isSeller=false
    user.productsAdded=false
    const updatedUser=await user.save();
    sellerProducts.forEach(async (item) =>{     
        temp=await Product.findById(item._id)
        temp.createdInCurrentPlan=false
        updatedProduct=await temp.save()
   });
    res.json(updatedUser)

  }else{
    res.status(404)
    throw new Error("User not found")
  }
})


export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  toggleSellerFalse
}