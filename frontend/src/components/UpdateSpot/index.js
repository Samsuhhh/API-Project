import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { editSpot, getSpotDetails } from "../../store/spots";

// maybe a modal
const UpdateSpotFormPage = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const spot = useSelector(state => state.spots.singleSpot);


    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);

    const updateAddress = e => setAddress(e.target.value);
    const updateCity = e => setCity(e.target.value);
    const updateState = e => setState(e.target.value);
    const updateCountry = e => setCountry(e.target.value);
    const updateLat = e => setLat(e.target.value);
    const updateLng = e => setLng(e.target.value);
    const updateName = e => setName(e.target.value);
    const updateDescription = e => setDescription(e.target.value);
    const updatePrice = e => setPrice(e.target.value);



    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    }, [ dispatch ])


    const handleSubmit = async (e) => {
        e.preventDefault();
        // e.stopPropagation();

        const payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        };

        let updatedSpot = await dispatch(editSpot(payload, spotId));
        console.log('edited spot', updatedSpot)

        if (updatedSpot) {
            history.push(`/spots/${updatedSpot.id}`)
        }
    }



    return (
        <div id='form-container'>
            <div id='updateSpot-form'>
                <div>
                    <h1>UPDATE YOUR SPOT</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'></label>
                        <input
                            id='name'
                            type='text'
                            onChange={updateName}
                            value={name}
                        />
                    </div>
                    <div>
                        <label htmlFor='lat'></label>
                        <input
                            id='lat'
                            type='text'
                            onChange={updateLat}
                            value={lat}
                        />
                    </div>
                    <div>
                        <label htmlFor='lng'></label>
                        <input
                            id='lng'
                            type='text'
                            onChange={updateLng}
                            value={lng}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'></label>
                        <input
                            id='address'
                            type='text'
                            onChange={updateAddress}
                            value={address}
                        />
                    </div>
                    <div>
                        <label htmlFor='city'></label>
                        <input
                            id='city'
                            type='text'
                            onChange={updateCity}
                            value={city}
                        />
                    </div>
                    <div>
                        <label htmlFor='state'></label>
                        <input
                            id='state'
                            type='text'
                            onChange={updateState}
                            value={state}
                        />
                        <br></br>
                        <select
                            name="Country"
                            onChange={updateCountry}
                            value={country}
                        >
                            <option value="" >
                                select a country
                            </option>
                            <option>USA</option>
                            <option>CHINA</option>
                            <option>Australia</option>
                        </select>
                    </div>
                    <div>

                        <label htmlFor='price'></label>
                        <input
                            id='price'
                            type='text'
                            onChange={updatePrice}
                            value={price}
                        />
                    </div>
                    <div>
                        <label htmlFor='description'></label>
                        <textarea
                            id='description'
                            type='text'
                            onChange={updateDescription}
                            value={description}
                            placeholder='Bio here'
                        />
                    </div>
                    <button>SUBMIT</button>
                </form>
            </div>
        </div>
    )

}


export default UpdateSpotFormPage;