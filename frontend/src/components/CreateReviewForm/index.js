import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";



const CreateReviewForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const { spotId } = params;

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);

    return (
        <div id='create-review-form'>
            <div>
                <form>
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
                </form>

            </div>
        </div>
    )


}

export default CreateReviewForm;