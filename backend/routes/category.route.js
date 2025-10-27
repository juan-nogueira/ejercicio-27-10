const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');


router.post('/', categoryController.createCategory); // Crear categoría
router.get('/', categoryController.getCategories);// Listar categorías
router.get('/:id', categoryController.getCategoryById); // Obtener categoría por ID
router.put('/:id', categoryController.updateCategory); // Actualizar categoría
router.delete('/:id', categoryController.deleteCategory); // Eliminar categoría

module.exports = router;
