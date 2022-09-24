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

        if ( !address || address.length > 20 || address.length <= 5) {
            errors.push('Please provide a valid address.')
        };
        if ( !city || city.length > 20 || city.length <= 5) {
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

        <div className='form-container'>
            <div id='createSpot-form'>
                <div>
                    <h1>CREATE NEW SPOT!!!</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'></label>
                        <input
                            id='name'
                            type='text'
                            onChange={e => setName(e.target.value)}
                            value={name}
                            placeholder='Name'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='lat'></label>
                        <input
                            id='lat'
                            type='text'
                            onChange={e => setLat(e.target.value)}
                            value={lat}
                            placeholder='Latitude'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='lng'></label>
                        <input
                            id='lng'
                            type='text'
                            onChange={e => setLng(e.target.value)}
                            value={lng}
                            placeholder='Longitude'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='address'></label>
                        <input
                            id='address'
                            type='text'
                            onChange={e => setAddress(e.target.value)}
                            value={address}
                            placeholder='Address'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='city'></label>
                        <input
                            id='city'
                            type='text'
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            placeholder='City'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='state'></label>
                        <input
                            id='state'
                            type='text'
                            onChange={e => setState(e.target.value)}
                            value={state}
                            placeholder='State'
                            required
                        />
                        <br></br>
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
                    <div>

                        <label htmlFor='price'></label>
                        <input
                            id='price'
                            type='text'
                            onChange={e => setPrice(e.target.value)}
                            value={price}
                            placeholder='Price'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='description'></label>
                        <textarea
                            id='description'
                            type='text'
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                            placeholder='Bio here'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='imgUrl'></label>
                        <input
                            id='imgUrl'
                            type='text'
                            onChange={e => setImgUrl(e.target.value)}
                            value={imgUrl}
                            placeholder='imgUrl'
                            required
                            />
                    </div>

                    
                    <button
                    disabled={createSpotErrors.length > 0 ? true : false}
                    >Host my spot</button>
                    <button onClick={cancelHandler}>CANCEL</button>
                </form>
            </div>
        </div>
    )


}


export default CreateSpotForm;