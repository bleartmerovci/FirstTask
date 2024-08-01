const Review = require('../models/Review');
const Product = require('../models/Product');
const User = require('../models/User');

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name']
                },
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ]
        });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const review = await Review.create({
            productId,
            rating,
            comment,
            userId: req.user.id  
        });
        res.status(201).json(review);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getReviewsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.findAll({
            where: { productId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ]
        });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews for product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllReviews,
    createReview,
    getReviewsByProductId
};
