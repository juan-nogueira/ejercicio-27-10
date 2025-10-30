import express from "express";
const router = express.Router();
import productController from "../controllers/product.controller.js";
import logger from "../middleware/logger.js";


router.post('/', logger, productController.createProduct);// Crear producto
router.get('/', logger, productController.getAllProducts);// Listar productos
router.get('/:id', logger, productController.getProductById);// Obtener producto por ID
router.put('/:id', logger, productController.updateProduct);// Actualizar producto
router.delete('/:id', logger, productController.deleteProduct);// Eliminar producto

export default router;