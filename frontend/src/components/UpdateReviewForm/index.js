import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { editReview } from "../../store/reviews"


const UpdateReviewForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const { reviewId } = useParams();

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);

    const updateReview = e => setReview(e.target.value);
    const updateStars = e => setStars(e.target.value);


    const submitHandler = async (e) => {
        e.preventDefault();

        const payload = {
            review,
            stars
        }
        let newReview = await dispatch(editReview(payload, reviewId))

        if (newReview) {
            history.push(`/spots/${reviewId}`)
        }
    }


    return (
        <div id='create-review-form'>
            <div id='form-container'> HELLO WORLD
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="review"></label>
                        <textarea
                            id='review'
                            type='text'
                            onChange={e => updateReview(e.target.value)}
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
                            onChange={e => updateStars(e.target.value)}
                        />
                    </div>
                    <button>SUBMIT</button>
                </form>

            </div>
        </div>
    )

}