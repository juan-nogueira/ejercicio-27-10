const postCategory = async (req, res) => {
    try {
        const { name, description, parentCategory, isActive } = req.body;
        const newCategory = new Category({ name, description, parentCategory, isActive });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }

}

module.exports = {
    postCategory
};