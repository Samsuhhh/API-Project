import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import SingleSpot from '../SingleSpot/index';
import SpotDetail from '../SpotDetails';
import './allSpots.css'

const SpotsBrowser = () => {
    const dispatch = useDispatch();

    const spots = useSelector(state => state.spots.allSpots);
    console.log('ALL SPOTS', spots)
    const [count, setCount] = useState(0);

    useEffect(() => {
        let counter = count;
        let countInterval = setInterval(() => {
            if (counter >= Object.values(spots).length) {
                clearInterval(countInterval)
            } else {
                setCount(count => count + 1)
            }
        }, 60);
        return () => (clearInterval(countInterval))
    }, [spots])

    useEffect(() => {
        const getAllspotsDispatch = dispatch(getAllSpots());
        console.log('get all spots dispatch', getAllspotsDispatch);
    }, [dispatch])

    const allSpotsArray = Object.values(spots).slice(0, count);

    // return null;
    if (!(spots)) return null;



    return (
        <div className='wrapper'>

            <div className='SpotsContainer'>

                {allSpotsArray.map(spot => {
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