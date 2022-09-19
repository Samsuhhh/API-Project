import { getSpotDetails } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './SpotDetails.css'

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

                <div className="body">
                    <div>
                        {spotDetails.name}
                    </div>
                    <div>
                        {spotDetails.id}
                    </div>
                    <div>
                        {spotDetails.price}
                    </div>

                </div>
            </div>
        </>
    )
}

export default SpotDetail;