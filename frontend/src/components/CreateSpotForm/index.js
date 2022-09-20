import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewSpot } from '../../store/spots';
import './CreateSpotForm.css'


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
       console.log('NEw spot', newSpot)

       if (newSpot) {
        history.push(`/spots/${newSpot.id}`)
       }
    }

    return (

        <div id='form-container'>
            <div id='createSpot-form'>
                <div>
                    <h1>CREATE SPOT</h1>
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
                        />
                        <br></br>
                        <select
                            name="Country"
                            onChange={(e) => setCountry(e.target.value)}
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
                            onChange={e => setPrice(e.target.value)}
                            value={price}
                            placeholder='Price'
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
                        />
                    </div>
                    <button >SUBMIT</button>
                </form>
            </div>
        </div>
    )


}


export default CreateSpotForm;