const express = require('express');
const router = express.Router();
const { createOrder, getOrder, updateOrderStatus } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, role(['customer']), createOrder);
router.get('/:id', auth, role(['customer', 'admin']), getOrder);
router.put('/:id', auth, role(['admin']), updateOrderStatus);

module.exports = router;
