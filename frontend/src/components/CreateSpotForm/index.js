import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createNewSpot } from '../../store/spots';
import './CreateSpotForm.css'
import { addSpotImage } from '../../store/spots';


const CreateSpotForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [createSpotErrors, setCreateSpotErrors] = useState([]);

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
        if (!price || !Number(price)) {
            errors.push('Price must be a number.')
        };
        if (!state || state.length > 25 || state.length < 5) {
            errors.push('State must be greater than 5, and less than 25 characters.')
        }
        if (!country) {
            errors.push('Please select a country.')
        }
        if (!imgUrl.match(/\.(jpg|jpeg|png|gif)$/)) errors.push('Image url must end in .jpg .jpeg .png or .gif')

        setCreateSpotErrors(errors);
    }, [address, city, name, description, price, state, country, imgUrl]);



    const handleSubmit = async (e) => {
        e.preventDefault();

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

        let newSpot = await dispatch(createNewSpot(payload));
        //    console.log('NEw spot', newSpot)

        // include an  image for the new spot
        if (newSpot) {

            const imgReq = ({
                url: imgUrl,
                preview: true
            });

            await dispatch(addSpotImage(imgReq, newSpot.id))
            history.push(`/spots/${newSpot.id}`)
        }
    };

    const cancelHandler = (e) => {
        e.preventDefault();
        history.push('/');
    };

    return (

        <div id='create-form-styling' className='form-container'>

            <div id='error-handling'>
                <h2 id='form-requirements-heading'>Form Requirements:</h2>
                <ul id='error-list'>
                    {createSpotErrors.length > 0 && createSpotErrors.map((error) => {
                        return <li id='list-error' key={error}>{error}</li>
                    })}
                    {createSpotErrors.length === 0 && (
                        <li id='allclear-message'>Your spot is good to go!</li>
                    )}
                </ul>
            </div>

            <div id='createSpot-form'>


                <div id='form-styling'>
                    <div id='create-h1-header'>
                        <h1 style={{ fontWeight: 400 }}>Tell us about your place!</h1>
                    </div>


                    <form className='createForm-inputs-div' onSubmit={handleSubmit}>

                        <div className='createForm-inputs-div' >
                            <input
                                id='createName'
                                className='createSpot-input'
                                type='text'
                                onChange={e => setName(e.target.value)}
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
                                onChange={e => setAddress(e.target.value)}
                                value={address}
                                placeholder='Address'
                                required
                            />
                        </div>
                        <div className='createForm-inputs-div' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setCity(e.target.value)}
                                value={city}
                                placeholder='City'
                                required
                            />
                        </div>
                        <div className='createForm-inputs-div' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setState(e.target.value)}
                                value={state}
                                placeholder='State'
                                required
                            />
                        </div>
                        <div className='createForm-inputs-div' >
                            <select
                                id='select-country'
                                name="Country"
                                onChange={(e) => setCountry(e.target.value)}
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
                                onChange={e => setPrice(e.target.value)}
                                value={price}
                                placeholder='Price'
                                required
                            />
                        </div>
                        <div className='createForm-inputs-div' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setImgUrl(e.target.value)}
                                value={imgUrl}
                                placeholder='imgUrl'
                                required
                            />
                        </div>
                        <div className='createForm-inputs-div' >
                            <textarea
                                className='createSpot-inputs'
                                id='create-description'
                                type='text'
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                placeholder='Description here'
                                style={{ resize: 'none', outline: 'none', width: '450px', height: '150px' }}
                                required
                            />
                        </div>

                        <div id='create-buttons'>
                            <button
                                className='createSpot-buttons'
                                disabled={createSpotErrors.length > 0 ? true : false}
                            >Host my spot</button>
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


export default CreateSpotForm;