const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
import { logger } from "../middlewares/logger.js";


router.post('/', logger, productController.createProduct);// Crear producto
router.get('/', logger, productController.getAllProducts);// Listar productos
router.get('/:id', logger, productController.getProductById);// Obtener producto por ID
router.put('/:id', logger, productController.updateProduct);// Actualizar producto
router.delete('/:id', logger, productController.deleteProduct);// Eliminar producto

module.exports = router;