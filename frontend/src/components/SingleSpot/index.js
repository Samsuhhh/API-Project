import './SingleSpot.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spots';
import { Link, NavLink } from 'react-router-dom';
// import SpotsBrowser from '../AllSpots';


const SingleSpot = (spot) => {

    console.log('SINGLE SPOT', spot)

    return (
        // <>
            <NavLink to={`/spots/${spot.spot.id}`}>
                <div className="spot-card-container">
                    <div className='image-section'>
                        <img id='spot-img' alt='beautiful spotImage' src={spot.spot.previewImage ||
                            'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg'} />
                    </div>
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
                </div>
            </NavLink>
     // </> 

)

}



export default SingleSpot;