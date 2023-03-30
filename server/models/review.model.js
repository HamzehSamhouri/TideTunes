const mongoose = require('mongoose');

//! REVIEW SCHEMA
const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    artist: {
        type: String,
        required: [true, "Artist(s) is/are required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"]
    },
    review: {
        type: String,
        required: [true, "Review is required"]
    }

}, { timestamps: true });
module.exports.Review = mongoose.model('Review', ReviewSchema);