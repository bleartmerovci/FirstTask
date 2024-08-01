const { Order, OrderProduct } = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
    const { products, paymentDetails } = req.body;
    const order = await Order.create({ CustomerId: req.user.id, paymentDetails });
    await Promise.all(products.map(async (product) => {
        await OrderProduct.create({ OrderId: order.id, ProductId: product.id, quantity: product.quantity });
    }));
    res.status(201).json(order);
};

const getOrder = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
        include: [{ model: Product, through: { attributes: ['quantity'] } }]
    });
    if (order.CustomerId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).send('Access Denied');
    }
    res.json(order);
};

const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByPk(id);
    await order.update({ status });
    res.json(order);
};

module.exports = { createOrder, getOrder, updateOrderStatus };
