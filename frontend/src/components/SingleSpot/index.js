import './SingleSpot.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spots';
// import SpotsBrowser from '../AllSpots';


const SingleSpot = (spot) => {

    const dispatch = useDispatch();

    const spots = useSelector(state => {
        return state.spots
    })


    useEffect(() => {
        dispatch(getAllSpots());

    }, [dispatch])


    if (!spots) return null;

    console.log('SPOTS:', spots)

    return (
        <>
            {/* <div className="spot-card-container"> */}
            <img id="spotImg" alt="nice house" src='https://64.media.tumblr.com/01d5b773173c39a69236138458ca2482/tumblr_p7eck8xuUC1ss7ju0o1_1280.jpg' />
            <div className='description-stars'>
                <div id='location'>
                    {`${spot.spot.city}, ${spot.spot.state}`}
                </div>
                <div>
                    {spot.spot.avgRating}
                </div>
            </div>
            <div id='miles'>
                {spot.spot.name}
            </div>
            <div id='dates'>
               {spot.spot.address}
            </div>
            <div id="price">
                ${spot.spot.price}
            </div>

            {/* </div> */}
        </>
    )

}



export default SingleSpot;