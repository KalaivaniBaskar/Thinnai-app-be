import express from 'express';

import { verifyAccessToken } from '../middleware/verifyAccessToken.js';
import { handleFailedPayment, handleGetOrders, handleOrder, handlePaymentVerify } from '../Controllers/paymentController.js';

const router = express.Router();

router.post('/get-orders', verifyAccessToken, handleGetOrders )  
router.post('/orders', verifyAccessToken, handleOrder )  
router.post('/verify', verifyAccessToken, handlePaymentVerify )  
router.post('/failed', verifyAccessToken, handleFailedPayment )  


export const paymentRouter = router;