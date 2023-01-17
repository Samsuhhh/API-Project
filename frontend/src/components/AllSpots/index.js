import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SingleSpot from '../SingleSpot/index';
import SpotDetail from '../SpotDetails';
import './allSpots.css'

const SpotsBrowser = () => {
    const dispatch = useDispatch();

    const spots = useSelector(state => Object.values(state.spots.allSpots));
    console.log('ALL SPOTS', spots)
    const [count, setCount] = useState(0);

    
    useEffect(() => {
        let counter = count;
        let countInterval = setInterval(() => {
            if (counter >= spots.length) {
                clearInterval(countInterval)
            } else {
                setCount(count => count + 1);
            }
        }, 30);

        return () => (clearInterval(countInterval))
    }, [spots])

    useEffect(() => {
        const getAllspotsDispatch = dispatch(getAllSpots());
        console.log('get all spots dispatch', getAllspotsDispatch);
    }, [dispatch])

    const allSpotsArray = spots.slice(0, count);
    console.log('allSpotsArray', allSpotsArray)
    // return null;
    if (!spots.length) return null;



    return (
        <div className='wrapper'>

            <div className='SpotsContainer'>

                {allSpotsArray.map(spot => (
                     <div key={spot.id} className='single-card'>

                        <SingleSpot spot={spot} key={spot.id}>

                        </SingleSpot>

                    </div>
                ))}


            </div>

        </div>

    )



}

export default SpotsBrowser;