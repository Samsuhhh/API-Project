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

        if (!address || address.length > 20 || address.length <= 5) {
            errors.push('Please provide a valid address.')
        };
        if (!city || city.length > 20 || city.length <= 5) {
            errors.push('Please provide a valid city.')
        };
        if (!name || name.length > 24 || name.length < 3) {
            errors.push('Please provide a valid name.')
        };
        if (!description || description.length > 150 || description.length < 5) {
            errors.push('Please provide a valid description.')
        };
        if (!price || !Number(price)) {
            errors.push('Please provide a valid price.')
        };

    });



    const handleSubmit = async (e) => {
        e.preventDefault();

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

            <div id='createSpot-form'>


                <div id='form-styling'>
                    <div id='create-h1-header'>
                        <h1>Tell us about your place!</h1>
                    </div>
                    <form className='createForm-inputs' onSubmit={handleSubmit}>
                        
                        <div id='createName' className='createForm-inputs' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setName(e.target.value)}
                                value={name}
                                placeholder='Name'
                                required
                            />
                        </div>
                        <div className='createForm-inputs' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setLat(e.target.value)}
                                value={lat}
                                placeholder='Latitude'
                                required
                            />
                        </div>
                        <div className='createForm-inputs' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setLng(e.target.value)}
                                value={lng}
                                placeholder='Longitude'
                                required
                            />
                        </div>
                        <div className='createForm-inputs' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setAddress(e.target.value)}
                                value={address}
                                placeholder='Address'
                                required
                            />
                        </div>
                        <div className='createForm-inputs' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setCity(e.target.value)}
                                value={city}
                                placeholder='City'
                                required
                            />
                        </div>
                        <div className='createForm-inputs' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setState(e.target.value)}
                                value={state}
                                placeholder='State'
                                required
                            />
                        </div>
                        <div className='createForm-inputs' >
                            <select
                                name="Country"
                                onChange={(e) => setCountry(e.target.value)}
                                value={country}
                                required
                            >
                                <option value="" >
                                    select a country
                                </option>
                                <option>USA</option>
                                <option>CHINA</option>
                                <option>Australia</option>

                            </select>
                        </div>
                        {/* </div> */}
                        <div className='createForm-inputs' >

                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setPrice(e.target.value)}
                                value={price}
                                placeholder='Price'
                                required
                            />
                        </div>
                        <div className='createForm-inputs' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setImgUrl(e.target.value)}
                                value={imgUrl}
                                placeholder='imgUrl'
                                required
                            />
                        </div>
                        <div className='createForm-inputs' >
                            <textarea
                                id='create-description'                            
                                type='text'
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                placeholder='Description here'
                                style={{ resize: 'none', outline: 'none', width: '500px', height: '150px' }}
                                required
                            />
                        </div>

                        <div id='buttons'>
                            <button
                                disabled={createSpotErrors.length > 0 ? true : false}
                            >Host my spot</button>
                            <button onClick={cancelHandler}>CANCEL</button>

                        </div>
                    </form>
                </div>

            </div>



        </div>
    )


}


export default CreateSpotForm;