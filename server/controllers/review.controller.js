const { Review } = require('../models/review.model');


module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

//! CREATE REVIEW
module.exports.createReview = (request, response) => {
    const {title, artist, category, rating, review } = request.body;
    Review.create({
        title, artist, category, rating, review
    })
        .then(review => response.json(review))
        .catch(err => response.status(400).json(err))
}

//! VIEW ALL REVIEWS
module.exports.allReviews = (req, res) => {
    Review.find()
        .then((allReviews) => {
            res.json({ results: allReviews });
        })
        .catch((err) => {
            res.json({ message: "Something went wrong", error: err });
        });
};

//! VIEW ONE REVIEW
module.exports.oneReview = (req, res) => {
    Review.findOne({ _id: req.params.id })
        .then(oneReview => {
            res.json({ results: oneReview })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        })
};

//! UPDATE ONE REVIEW
module.exports.updateReview = (request, response) => {
    Review.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true, runValidators: true })
        .then(updatedReview => response.json(updatedReview))
        .catch(err => response.status(400).json(err))
}

//! DELETE ONE REVIEW
module.exports.deleteReview = (request, response) => {
    Review.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}