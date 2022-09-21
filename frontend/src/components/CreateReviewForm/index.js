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
    }

    // const redirectHandler = () => {
    //     history.push(`/spots/${spotId}`)
    // }


    return (
        <div id='create-review-form'>
            <div id='form-container'> HELLO WORLD
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="review"></label>
                        <textarea
                            id='review'
                            type='text'
                            onChange={e => setReview(e.target.value)}
                            value={review}
                        />
                    </div>
                    <div>
                        <label htmlFor="stars"></label>
                        <input
                            id='stars'
                            type='number'
                            min='0'
                            max='5'
                            step='1'
                            value={stars}
                            onChange={e => setStars(e.target.value)}
                        />
                    </div>
                    <button>SUBMIT</button>
                </form>

            </div>
        </div>
    )


}

export default CreateReviewForm;