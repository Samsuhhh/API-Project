import { editSpot, getSpotDetails } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import './SpotDetails.css'
import UpdateSpotFormPage from "../UpdateSpot";


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

    return (
        <>
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
        </div>
        
        </>

    )
}

export default SpotDetail;