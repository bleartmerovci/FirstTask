const User = require('../models/User');
const Product = require('../models/Product');

const modifyUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByPk(id);
    await user.update({ role });
    res.json(user);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    await product.destroy();
    res.status(204).send();
};

module.exports = { modifyUserRole, deleteProduct };
