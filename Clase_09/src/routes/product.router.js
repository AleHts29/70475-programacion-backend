import { Router } from 'express';

import {
    getDatosControllers,
    postDatosControllers,
    deleteDatosControllers
} from '../controolers/products.controllers.js'


const router = Router();


// Get
router.get('/', getDatosControllers)

// Post
router.post('/', postDatosControllers)

// Delete
router.delete('/', deleteDatosControllers)


export default router;