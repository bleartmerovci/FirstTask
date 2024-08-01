const express = require('express');
const router = express.Router();
const { getAllReviews, createReview, getReviewsByProductId } = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');


router.get('/', auth, role(['admin']), getAllReviews);


router.post('/', auth, role(['customer']), createReview);

router.get('/product/:productId', getReviewsByProductId);

module.exports = router;
