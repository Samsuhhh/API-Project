import { getSpotDetails } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const SpotDetail = () => {
    const params = useParams();
    const { spotId } = params;
    const dispatch = useDispatch();

    const spotDetails = useSelector(state => {
        return state.spots
    })

    console.log('hi')

    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    }, [dispatch])

    // if (!spotDetails) return null;

    return (
        <>
        <div className="body">
            <p>
                HI HI HI
            </p>
            {/* {spotDetails} */} 
        </div>
        </>
    )
}

export default SpotDetail;