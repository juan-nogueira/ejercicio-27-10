import express from "express";
const router = express.Router();
import categoryController from "../controllers/category.controller.js";
import logger from "../middleware/logger.js";


router.post('/', logger, categoryController.createCategory); // Crear categoría
router.get('/', logger, categoryController.getAllCategories);// Listar categorías
router.get('/:id', logger, categoryController.getCategoryById); // Obtener categoría por ID
router.put('/:id', logger, categoryController.updateCategory); // Actualizar categoría
router.delete('/:id', logger, categoryController.deleteCategory); // Eliminar categoría

export default router;
