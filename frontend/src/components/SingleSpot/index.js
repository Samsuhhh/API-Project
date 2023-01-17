import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SingleSpot.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SingleSpot = (spot) => {

    console.log('SINGLE SPOT', spot)

    const [isLoaded, setIsLoaded] = useState(false);
    setTimeout(() => {
       setIsLoaded(true) 
    }, 500);


    if (!isLoaded) {
        return (
            <>
                <Skeleton style={{ height: "287px", width: "300px", borderRadius: "5%", marginBottom: "5px" }}></Skeleton>
                <div id='location-avgRating' className='spot-values'>
                    <Skeleton style={{ height: "16px", width: "170px", borderRadius: "16px" }}></Skeleton>
                    <Skeleton style={{ height: "16px", width: "60px", borderRadius: "16px" }}></Skeleton>
                </div>
                <Skeleton style={{ height: "16px", width: "95px", borderRadius: "16px" }}></Skeleton>
                <Skeleton style={{ height: "16px", width: "120px", borderRadius: "16px" }}></Skeleton>
                <Skeleton style={{ height: "16px", width: "50px", borderRadius: "16px" }}></Skeleton>
            </>
        )
    }
    return isLoaded && (
        <>
            <NavLink id='nav-link' to={`/spots/${spot.spot.id}`}>
                <div className="spot-card-container">
                    <div className='image-section'>
                        <img id='spot-img' alt='beautiful spotImage' src={spot.spot.previewImage ||
                            'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg'}
                        />
                    </div>
                    <div id='singleSpot-details-container'>
                        <div id='location-avgRating' className='spot-values'>
                            <div id='location'>
                                {`${spot.spot.city}, ${spot.spot.state}`}
                            </div>
                            <div className='spot-values'>
                                {'★ ' + spot.spot.avgRating}
                            </div>
                        </div>
                        <div className='spot-values'>
                            {spot.spot.name}
                        </div>
                        <div className='spot-values'>
                            {spot.spot.address}
                        </div>
                        <div className='spot-values'>
                            <span style={{ fontWeight: '600' }}>
                                ${spot.spot.price}
                            </span>
                            <span style={{ paddingLeft: '3px' }}>night</span>
                        </div>
                    </div>

                </div>
            </NavLink>
        </>

    )

}



export default SingleSpot;