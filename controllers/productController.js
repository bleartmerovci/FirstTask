const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const { name, price, stock, description, category } = req.body;

        const product = await Product.create({
            name,
            price,
            stock,
            description,
            category,
            VendorId: req.user.id  // Assuming the user is a vendor
        });

        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock, description, category } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.VendorId !== req.user.id) {
            return res.status(403).json({ error: 'You can only update your own products' });
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.description = description || product.description;
        product.category = category || product.category;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.VendorId !== req.user.id) {
            return res.status(403).json({ error: 'You can only delete your own products' });
        }

        await product.destroy();
        res.status(204).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts
};
