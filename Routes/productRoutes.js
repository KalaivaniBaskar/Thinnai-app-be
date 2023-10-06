import express from 'express';
import { verifyRolePermission } from '../middleware/verifyRolePermission.js';
import { USER_ROLES } from '../config/user_Roles.js';
import { verifyAccessToken } from '../middleware/verifyAccessToken.js';
import { getAllProducts, handleAddProduct, handleDeleteProduct, handleEditProduct, handleUpdateStock } from '../Controllers/productsController.js';

const router = express.Router();

router.post('/update-stock', verifyAccessToken,  handleUpdateStock )  
router.post('/add-product', verifyAccessToken, verifyRolePermission(USER_ROLES.Admin), handleAddProduct )  
router.post('/edit-product', verifyAccessToken, verifyRolePermission(USER_ROLES.Admin), handleEditProduct )  
router.delete('/delete-product/:product_ID', verifyAccessToken, verifyRolePermission(USER_ROLES.Admin), handleDeleteProduct )  
router.post('/all', getAllProducts )

export const productRouter = router;