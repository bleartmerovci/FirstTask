const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, deleteUser } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Route to get all users (Admin Only)
router.get('/users', auth, role(['admin']), getAllUsers);

// Additional routes for updating and deleting users
router.put('/users/:id', auth, role(['admin']), updateUser);
router.delete('/users/:id', auth, role(['admin']), deleteUser);

module.exports = router;
