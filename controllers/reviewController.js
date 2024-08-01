const Review = require('../models/Review');

const createReview = async (req, res) => {
    const { productId, rating, comment } = req.body;
    const review = await Review.create({
        ProductId: productId, CustomerId: req.user.id, rating, comment
    });
    res.status(201).json(review);
};

const getReviews = async (req, res) => {
    const { productId } = req.params;
    const reviews = await Review.findAll({ where: { ProductId: productId } });
    res.json(reviews);
};

const deleteReview = async (req, res) => {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (review.CustomerId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).send('Access Denied');
    }
    await review.destroy();
    res.status(204).send();
};

module.exports = { createReview, getReviews, deleteReview };
