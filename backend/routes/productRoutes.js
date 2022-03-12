import express from "express";
import { getProductById,getProducts,deleteProduct,createProduct,updateProduct,createProductReview,getTopProducts, getSellerCreatedProducts, getProductsAddedNumber } from "../controllers/productController.js";
// import { protect, admin } from "../middleware/authMiddleware.js";
import { protect, admin, sellerOrAdmin } from "../middleware/authMiddleware.js";

const router=express.Router()


// router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/').get(getProducts).post(protect,sellerOrAdmin,createProduct)
router.route('/:id/reviews').post(protect,createProductReview)
router.get('/top',getTopProducts)

router.get('/user/:id',getSellerCreatedProducts)
// router.route('/user/:id').get(protect,sellerOrAdmin,createProductReview)

router.get('/user/:id/length',getProductsAddedNumber)


// router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)
// router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,sellerOrAdmin,updateProduct)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,sellerOrAdmin,updateProduct)
// router.route('/:id').get(getProductById).delete(protect,sellerOrAdmin,deleteProduct).put(protect,sellerOrAdmin,updateProduct)

export default router