const ReviewController = require('../controllers/review.controller');
module.exports = function(app){


//! TEST INDEX
    app.get('/api/', ReviewController.index);

//! CREATE
    app.post('/api/new/review', ReviewController.createReview);

//! READ ALL
    app.get("/api/reviews", ReviewController.allReviews);

//! READ ONE
    app.get("/api/review/:id", ReviewController.oneReview);

//! UPDATE
    app.put('/api/review/:id', ReviewController.updateReview);

//! DELETE
app.delete('/api/review/:id', ReviewController.deleteReview);
}