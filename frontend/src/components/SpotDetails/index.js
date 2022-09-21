import { editSpot, getSpotDetails } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import './SpotDetails.css'
import UpdateSpotFormPage from "../UpdateSpot";
import { deleteSpot } from "../../store/spots";
import SpotReviews from "../AllReviews";


const SpotDetail = () => {
    const params = useParams();
    const { spotId } = params;
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.singleSpot);


    const spotDetails = useSelector(state => {
        return state.spots.singleSpot
    })

    // console.log('hi')

    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    }, [dispatch, spotId])

    if (!spotDetails) return null;


    const updateRedirect = async (e) => {
        // let updatedSpot = await dispatch(getSpotDetails(spotId));
        // console.log('UPDATING SPOT', updatedSpot);
        // if(updatedSpot) {
        history.push(`/spots/update/${spotId}`)
        // }
    }

    const deleteHandler = async () => {
        // if (window.confirm('Are you sure you want to delete this spot?')) this.onCancel(spot.id)
        dispatch(deleteSpot(spot.id));
        history.push('/')
    }
    
    const newReviewRedirect = () => {
        history.push(`/spots/${spotId}/new-review`)
    }

    return (
        <div>
            <div className="details-container">
                <div>
                    Spot Name:  {spotDetails.name}
                </div>
                <div className='image-section'>
                    <img alt='no pic' src='https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg' />
                </div>
                <div>
                    <div>
                        Spot Id: {spotDetails.id}
                    </div>
                    <div>
                        Price Per Night: ${spotDetails.price}
                    </div>
                    <div>
                        Spot Description: {spotDetails.description}
                    </div>
                </div>

                {currentUser && currentUser.id === spot.ownerId && (
                        <button onClick={updateRedirect}>UPDATE SPOT</button>
                )}
                <br></br>
                {currentUser && currentUser.id === spot.ownerId && (
                <button onClick={deleteHandler}>DELETE</button>
                )}
            </div>
            <div>
                Reviews
                <SpotReviews/>
            </div>
            <div>
                <button onClick={newReviewRedirect}>
                    CREATE NEW REVIEW
                </button>
            </div>

        </div>

    )
}

export default SpotDetail;