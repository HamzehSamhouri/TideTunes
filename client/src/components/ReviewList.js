import React, { useState } from 'react'
import axios from 'axios';

const ReviewList = (props) => {
    const [search, setSearch] = useState("");


    //! REMOVE FROM DOM 
    const { removeFromDom } = props;
    // console.log(props.reviews)

    //! BACKEND CALL TO DELETE ONE 
    const deleteReview = (reviewId) => {
        axios.delete('http://localhost:8000/api/review/' + reviewId)
            .then(res => {
                removeFromDom(reviewId)
            })
            .catch(err => console.error("Catch Error:", err));
    }

    //! PAGE RENDER
    return (
        <div className='reviewlist'>
            <div className='searchparameters'>
            <input onChange={e => setSearch(e.target.value)} type="text" placeholder='Search' />
            <p onClick={() => setSearch("")}>All</p>
            <p onClick={() => setSearch("Album")}>Albums</p>
            <p onClick={() => setSearch("Single")}>Singles</p>
            </div>
            {props.reviews.filter((review, idx) => {
                return review.title.toLowerCase().includes(search.toLowerCase()) || review.category.toLowerCase().includes(search.toLowerCase()) || review.artist.toLowerCase().includes(search.toLowerCase())
            }).map((review, idx) =>
                <div className='reviews' key={idx}>
                    <hr />
                    <h4>Track/Album: {review.title}</h4>
                    <p>Artist: {review.artist}</p>
                    <p>Category: {review.category}</p>
                    <p>Rating: {review.rating}</p>
                    <p>{review.review}</p>
                    {/* <button className='delete' onClick={(e) => { deleteReview(review._id) }}>Delete</button> */}
                    <hr />
                </div>
            )}
        </div>
    )
}
export default ReviewList;