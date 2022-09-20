import { getSpotDetails } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import './SpotDetails.css'
import UpdateSpotFormPage from "../UpdateSpot";

const SpotDetail = () => {
    const params = useParams();
    const { spotId } = params;
    const dispatch = useDispatch();

    const spotDetails = useSelector(state => {
        return state.spots.singleSpot
    })

    // console.log('hi')

    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    }, [dispatch, spotId])

    if (!spotDetails) return null;

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
        </div>

        <UpdateSpotFormPage/>
        
        </>

    )
}

export default SpotDetail;