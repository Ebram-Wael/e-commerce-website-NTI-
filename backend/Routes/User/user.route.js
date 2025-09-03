import express from 'express'
import { signUp, updateUser, deleteAdmin, deleteUser } from '../../Controllers/User/User.controller.js';
const router = express.Router();



router.post('/', signUp);


router.delete('/admin/:id', deleteAdmin);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);



export default router;