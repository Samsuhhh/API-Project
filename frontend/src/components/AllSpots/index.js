import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SingleSpot from '../SingleSpot/index';
import SpotDetail from '../SpotDetails';
import './allSpots.css'

const SpotsBrowser = () => {
    const dispatch = useDispatch();

    const spots = useSelector(state => state.spots.allSpots );
    console.log('SPOTS', spots)

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])


    // return null;
    if (!spots) return null;

    

    return (
        <div className='wrapper'>

            <div className='SpotsContainer'>

                {Object.values(spots).map(spot => {
                    return <div key={spot.id} className='single-card'>

                        <SingleSpot spot={spot}>
                        </SingleSpot>

                        
                    </div>
                })}


            </div>

        </div>
    )



}

export default SpotsBrowser;