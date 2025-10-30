const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
    try {
        const categorys = await Category.find().populate('parentCategory', 'name');
        res.json(categorys);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createCategory = async (req, res) => {
    try {
        const { name, description, parentCategory, isActive } = req.body;
        const newCategory = new Category({ name, description, parentCategory, isActive });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const category = await Category.findById(id).populate('parentCategory', 'name');
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching category',
            error: error.message
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        res.send("category eliminado con nombre: " + category.name)
    } catch (error){
        res.status(500).json({message: error.message})
    }
}

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send("category actualizado con nombre: " + category.name)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports = {
    createCategory,
    getCategoryById,
    getAllCategories,
    deleteCategory,
    updateCategory

};