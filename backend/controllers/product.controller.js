const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id)
            .populate('category', 'name description parentCategory');
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
};

const createProduct = async (req, res) => {
    const product = new Product(req.body)
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.send("producto eliminado con nombre: " + product.name)
    } catch (error){
        res.status(500).json({message: error.message})
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body)
        res.send("producto actualizado con nombre: " + product.name)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports = {
    getProductById,
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct
};
