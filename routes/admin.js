const express = require('express');
const router = express.Router();
const { modifyUserRole, deleteProduct } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.put('/user/:id/role', auth, role(['admin']), modifyUserRole);
router.delete('/product/:id', auth, role(['admin']), deleteProduct);

module.exports = router;
