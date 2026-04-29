import express from 'express';
import { 
    getAllUsersHandler,
    getUserByIdHandler,
    updateUserHandler,
    removeUserHandler,
    getReviewsByUserHandler,
    updateUserRoleHandler

} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validateUpdateUser} from '../middleware/userValidators.js'



const router = express.Router();
router.get('/me/reviews',authenticate,getReviewsByUserHandler);
router.get('/',authenticate,authorizeRoles('ADMIN'), getAllUsersHandler);
router.get('/me',authenticate,getUserByIdHandler);
router.put('/me',authenticate,validateUpdateUser,updateUserHandler);
router.delete('/me',authenticate,removeUserHandler);
export default router;