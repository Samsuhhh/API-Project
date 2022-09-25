import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";
import './CreateReviewForm.css'


const CreateReviewForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const { spotId } = params;

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);

    const submitHandler = async (e) => {
        e.preventDefault();

        const payload = {
            review,
            stars
        }
       let newReview = await dispatch(createReview(payload, spotId))

       if ( newReview ) {
           history.push(`/spots/${spotId}`)
       }

    //    if (!newReview) {
    //     window.alert('You have already created a review for this Spot.')
    //    }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}`)
    };

    return (
        <div id='create-review-form'>
            <div id='review-form-styling' className='form-container'>
                <h1 id='review-h1'>Leave a Review</h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <div>How was your stay?</div>
                        <label htmlFor="review"></label>
                        <textarea style={{ resize: 'none', outline:'none', width:'360px', height:'150px'}}
                            id='review-description'
                            type='text'
                            onChange={e => setReview(e.target.value)}
                            value={review}
                        />
                    </div>
                    <div> 
                        <label htmlFor="stars"></label>
                        <input
                            id='stars-reviews'
                            type='number'
                            min='0'
                            max='5'
                            step='1'
                            value={stars}
                            onChange={e => setStars(e.target.value)}
                        />
                    </div>

                    <div id='createReview-buttonDiv'>
                    <button id='createReview-submitBtn'type='submit'>Submit your review</button>
                    <button id='cancelReviewbtn'onClick={handleCancel}>Cancel</button>

                    </div>
                </form>

            </div>
        </div>
    )


}

export default CreateReviewForm;