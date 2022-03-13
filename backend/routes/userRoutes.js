import express from "express";
import { authUser,registerUser,toggleSellerFalse, getUserProfile, updateUserProfile, getUsers,deleteUser,getUserById,updateUser } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router=express.Router()

router.route('/').post(registerUser).get(protect,admin,getUsers)

// /api/users/reset/:id
router.put('/reset/:id',toggleSellerFalse)

router.post('/login',authUser)

router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)

router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)

export default router