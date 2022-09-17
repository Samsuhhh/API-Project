import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';

const SpotsBrowser = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spots = useSelector(state => {
        return state.spots
    });

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    // if (!spot) return null;


    return (
        <div className='SpotsContainer'>
            <div>
            <div>
                <ul>
                    {Object.values(spots).map(spot => {
                      return <li>{spot.address}</li>
                    })}    
                </ul>
            </div>

            </div>
        </div>
    )



}

export default SpotsBrowser;