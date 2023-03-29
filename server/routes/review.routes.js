const ReviewController = require('../controllers/review.controller');
module.exports = function(app){


// TEST INDEX
    app.get('/api/', ReviewController.index);

//Create
    app.post('/api/new/review', ReviewController.createReview);

//Read All
    app.get("/api/reviews", ReviewController.allReviews);

//Read One
    app.get("/api/review/:id", ReviewController.oneReview);

// Update
    app.put('/api/review/:id', ReviewController.updateReview);

// Delete
app.delete('/api/review/:id', ReviewController.deleteReview);
}