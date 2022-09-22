import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserSpots } from "../../store/spots";


const CurrentUserSpots = () => {
    const dispatch = useDispatch();

    const spots = useSelector(state => state.spots.allSpots);

    useEffect(() => {
        dispatch(getCurrentUserSpots())
    }, [dispatch])

    return (
        <div>
            {Object.values(spots).map(spot => (
                <div key={spot.id}>
                    <div> Spot's name: {spot.name}</div>
                    <div> Spot Id: {spot.id}</div>
                    <div> Spot's price: {spot.price} </div>
                </div>
            ))}
        </div>
    )
}

export default CurrentUserSpots;