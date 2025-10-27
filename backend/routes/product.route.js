const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');


router.post('/', productController.createProduct);// Crear producto
router.get('/', productController.getProducts);// Listar productos
router.get('/:id', productController.getProductById);// Obtener producto por ID
router.put('/:id', productController.updateProduct);// Actualizar producto
router.delete('/:id', productController.deleteProduct);// Eliminar producto

module.exports = router;