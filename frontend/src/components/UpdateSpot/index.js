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
    // const spotImg = useSelector(state => state.spots.singleSpot);
    // console.log(spotImg, spot)

    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    // const [lat, setLat] = useState(spot.lat);
    // const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    // const [imgUrl, setImgUrl] = useState(spot?.SpotImages[0]?.url);
    const [UpdateErrors, setUpdateErrors] = useState([]);

    const updateAddress = e => setAddress(e.target.value);
    const updateCity = e => setCity(e.target.value);
    const updateState = e => setState(e.target.value);
    const updateCountry = e => setCountry(e.target.value);
    // const updateLat = e => setLat(e.target.value);
    // const updateLng = e => setLng(e.target.value);
    const updateName = e => setName(e.target.value);
    const updateDescription = e => setDescription(e.target.value);
    const updatePrice = e => setPrice(e.target.value);
    // const updateImgUrl = e => setImgUrl(e.target.value)


    useEffect(() => {
        const errors = [];

        if (!address || address.length > 25 || address.length < 5) {
            errors.push('Address must be greater than 5, and less than 25 characters.')
        };
        if (!city || city.length > 25 || city.length < 3) {
            errors.push('City must be greater than 3, and less than 25 characters.')
        };
        if (!name || name.length > 40 || name.length < 3) {
            errors.push('Name must be greater than 3, and less than 25 characters.')
        };
        if (!description || description.length > 250 || description.length < 5) {
            errors.push('Description must be greater than 5, and less than 250 characters.')
        };
        if (!price || !Number(price) || price < 1) {
            errors.push('Price must be a number greater than 0.')
        };
        if (!state || state.length > 25 || state.length < 4) {
            errors.push('State must be greater than 4, and less than 25 characters.')
        }
        if (!country) {
            errors.push('Please select a country.')
        }
        // if (!imgUrl.match(/\.(jpg|jpeg|png|gif)$/)) errors.push('Image url must end in .jpg .jpeg .png or .gif')

        setUpdateErrors(errors);
    }, [address, city, name, description, price, state, country ]);


    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    }, [dispatch, spotId])

    if (!Object.keys(spot).length) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // e.stopPropagation();

        const payload = {
            address,
            city,
            state,
            country,
            // lat,
            // lng,
            name,
            description,
            price
        };

        let updatedSpot = await dispatch(editSpot(payload, spotId));
        console.log('edited spot', updatedSpot)

        if (!Object.keys(spot).length) return null;

        if (updatedSpot) {
            // const imgReq = ({
            //     url: imgUrl,
            //     preview: true
            // });
            // if (!Object.keys(spot).length) {
            //     console.log('FUCK ME')
            //     return null;
            // }
            // await dispatch(addSpotImage(imgReq, updatedSpot.id));
            history.push(`/spots/${updatedSpot.id}`);
        } 

    };

    const cancelHandler = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}`);
    };

    return (

        <div id='create-form-styling' className='form-container'>

            <div id='error-handling'>
                <h2 id='form-requirements-heading'>Form Requirements:</h2>
                <ul id='error-list'>
                    {UpdateErrors.length > 0 && UpdateErrors.map((error) => {
                        return <li id='list-error' key={error}>{error}</li>
                    })}
                    {UpdateErrors.length === 0 && (
                        <li id='allclear-message'>Your spot is good to go!</li>
                    )}
                </ul>
            </div>

            <div id='createSpot-form'>


                <div id='form-styling'>
                    <div id='create-h1-header'>
                        <h1 style={{ fontWeight: 400 }}>Update your spot's details</h1>
                    </div>


                    <form className='createForm-inputs-div' onSubmit={handleSubmit}>

                        <div className='createForm-inputs-div' >
                            <input
                                id='createName'
                                className='createSpot-input'
                                type='text'
                                onChange={updateName}
                                value={name}
                                placeholder='Name'
                                required
                            />
                        </div>
                        {/* <div className='createForm-inputs-div' >
                            <input
                                className='createSpot-input'
                                type='number'
                                onChange={e => setLat(e.target.value)}
                                value={lat}
                                placeholder='Latitude'
                                required
                            />
                        </div>
                        <div className='createForm-inputs-div' >
                            <input
                                className='createSpot-input'
                                type='number'
                                onChange={e => setLng(e.target.value)}
                                value={lng}
                                placeholder='Longitude'
                                required
                            />
                        </div> */}
                        <div className='createForm-inputs-div' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={updateAddress}
                                value={address}
                                placeholder='Address'
                                required
                            />
                        </div>
                        <div className='createForm-inputs-div' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={updateCity}
                                value={city}
                                placeholder='City'
                                required
                            />
                        </div>
                        <div className='createForm-inputs-div' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={updateState}
                                value={state}
                                placeholder='State'
                                required
                            />
                        </div>
                        <div className='createForm-inputs-div' >
                            <select
                                id='select-country'
                                name="Country"
                                onChange={updateCountry}
                                value={country}
                                required
                            >
                                <option value="" >
                                    Select a country
                                </option>
                                <option>USA</option>
                                <option>CHINA</option>
                                <option>Australia</option>

                            </select>
                        </div>
                        {/* </div> */}
                        <div className='createForm-inputs-div' >

                            <input
                                id='number-input'
                                className='createSpot-input'
                                type='number'
                                onChange={updatePrice}
                                value={price}
                                placeholder='Price'
                                required
                            />
                        </div>
                        {/* <div className='createForm-inputs-div' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setImgUrl(e.target.value)}
                                value={imgUrl}
                                placeholder='imgUrl'
                                required
                            />
                        </div> */}
                        <div className='createForm-inputs-div' >
                            <textarea
                                className='createSpot-inputs'
                                id='create-description'
                                type='text'
                                onChange={updateDescription}
                                value={description}
                                placeholder='Description here'
                                style={{ resize: 'none', outline: 'none', width: '450px', height: '150px' }}
                                required
                            />
                        </div>

                        <div id='create-buttons'>
                            <button
                                className='createSpot-buttons'
                                disabled={UpdateErrors.length > 0 ? true : false}
                            >Update new details</button>
                            <button
                                className='createSpot-buttons'
                                onClick={cancelHandler}>Cancel</button>

                        </div>
                    </form>
                </div>

            </div>



        </div>

    )

}


export default UpdateSpotFormPage;