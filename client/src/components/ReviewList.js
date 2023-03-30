import React from 'react'
import axios from 'axios';

const ReviewList = (props) => {
// REMOVE FROM DOM 
    const { removeFromDom } = props;
    // console.log(props.reviews)


    // BACKEND CALL TO DELETE ONE 
    const deleteReview = (reviewId) => {
        axios.delete('http://localhost:8000/api/review/' + reviewId)
            .then(res => {
                removeFromDom(reviewId)
            })
            .catch(err => console.error("Catch Error:", err));
    }

// PAGE RENDER
    return (
        <div>
            <h1 className='reviewsheader'>All Reviews</h1>
            {props.reviews && props.reviews.map((review, idx) =>
                <div key={idx}>
                    <hr/>
                    <h4>Track/Album: {review.title}</h4>
                    <p>Category: {review.category}</p>
                    <p>Rating: {review.rating}</p>
                    <p>{review.review}</p>
                    {/* <button className='delete' onClick={(e) => { deleteReview(review._id) }}>Delete</button> */}
                    <hr/>
                </div>
            )}
        </div>
    )
}
export default ReviewList;