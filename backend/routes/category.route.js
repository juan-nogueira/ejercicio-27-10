const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
import { logger } from "../middleware/logger";


router.post('/', logger, categoryController.createCategory); // Crear categoría
router.get('/', logger, categoryController.getAllCategories);// Listar categorías
router.get('/:id', logger, categoryController.getCategoryById); // Obtener categoría por ID
router.put('/:id', logger, categoryController.updateCategory); // Actualizar categoría
router.delete('/:id', logger, categoryController.deleteCategory); // Eliminar categoría

module.exports = router;
