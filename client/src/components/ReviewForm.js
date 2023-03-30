import React, { useState } from 'react'
import axios from 'axios';


const ReviewForm = (props) => {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");


// ERRORS
    const [errors, setErrors] = useState([]);



// BACKEND CALL TO CREATE 
    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/new/review', {
            title, artist, category, rating, review
        })
            .then(res => {
                // console.log(res.data);
                props.createNewReview(res.data);
            })

// ERROR MESSAGES
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

// PAGE RENDER
    return (
        <form onSubmit={onSubmitHandler}>
            <h1>New Review</h1>
            {errors.map((err, index) => <p className='error' key={index}>{err}</p>)}
            <p>
                <label>Title:</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
            </p>
            <p>
                <label>Artist(s):</label>
                <input type="text" onChange={(e) => setArtist(e.target.value)} value={artist}/>
            </p>
            <p>
            <label>Category:</label>
            <select onChange={(e) => setCategory(e.target.value)}>
                    <option></option>
                    <option value={"Album"}>Album</option>
                    <option value={"Single"}>Single</option>
                </select>
            </p>
            <p>
                <label>Rating:</label>
                <input type="number" min={0} max={5} onChange={(e) => setRating(e.target.value)} value={rating}/>
            </p>
            <p>
                <label>Review:</label>
                <input type="text" onChange={(e) => setReview(e.target.value)} value={review}/>
            </p>
            <input className='button space' type="submit" value="Create" />
        </form>
    )
}

export default ReviewForm