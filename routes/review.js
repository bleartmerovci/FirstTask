const express = require('express');
const router = express.Router();
const { createReview, getReviews, deleteReview } = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, role(['customer']), createReview);
router.get('/:productId', getReviews);
router.delete('/:id', auth, role(['admin']), deleteReview);

module.exports = router;
