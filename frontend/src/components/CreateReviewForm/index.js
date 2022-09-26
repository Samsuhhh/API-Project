import { useState } from "react";
import { useDispatch } from "react-redux";
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
                        <div style={{fontSize: '18px', fontWeight: '550'}}>How was your stay?</div>
                        <label htmlFor="review"></label>
                        <textarea style={{ resize: 'none', outline:'none', width:'360px', height:'150px'}}
                            id='review-description'
                            type='text'
                            onChange={e => setReview(e.target.value)}
                            value={review}
                        />
                    </div>
                    <div id='starsContainer'> 
                        {/* <label htmlFor="stars"></label>
                        <input
                            id='stars-reviews'
                            type='number'
                            min='0'
                            max='5'
                            step='1'
                            value={stars}
                            onChange={e => setStars(e.target.value)}
                        /> */}

                        <div id='starHeading'>Rate your stay</div>
                        <fieldset id='fieldset-stars'class="rate" value={stars} onChange={e => setStars(e.target.value)}>
                            <input className="starInput" type="radio" id="rating10" name="rating" value="5" /><label for="rating10" title="5 stars"></label>
                            <input className="starInput" type="radio" id="rating8" name="rating" value="4" /><label for="rating8" title="4 stars"></label>
                            <input className="starInput" type="radio" id="rating6" name="rating" value="3" /><label for="rating6" title="3 stars"></label>
                            <input className="starInput" type="radio" id="rating4" name="rating" value="2" /><label for="rating4" title="2 stars"></label>
                            <input className="starInput" type="radio" id="rating2" name="rating" value="1" /><label for="rating2" title="1 star"></label>
                        </fieldset>
                    </div>
                    {/* <br></br>
                        {stars} stars */}
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