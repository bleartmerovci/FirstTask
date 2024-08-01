const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getProducts } = require('../controllers/productController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, role(['vendor']), createProduct);
router.put('/:id', auth, role(['vendor']), updateProduct);
router.delete('/:id', auth, role(['vendor']), deleteProduct);
router.get('/', getProducts);

module.exports = router;
