import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewSpot } from '../../store/spots';
import './CreateSpotForm.css'

const CreateSpotForm = () => {

    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');


    const handleSubmit = () => {

    }

    return (


        <div id='form-container'>
            <div id='createSpot-form'>
                <div>
                    <h1>CREATE SPOT</h1>
                </div>
                <form>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input
                            id='name'
                            type='text'
                            onChange={e => setName(e.target.value)}
                            value={name}
                            placeholder='Name here'
                        />
                    </div>
                    <div>
                        <label htmlFor='city'>City:</label>
                        <input
                            id='city'
                            type='text'
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            placeholder='City here'
                        />
                    </div>
                    <div>
                        <label htmlFor='state'>State:</label>
                        <input
                            id='state'
                            type='text'
                            onChange={e => state(e.target.value)}
                            value={state} state
                            placeholder='State here'
                        />
                        <br></br>
                        <select
                            name="Country"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                        >
                            <option value="" >
                                select country
                            </option>
                            <option>USA</option>
                            <option>CHINA</option>
                            <option>Australia</option>
                        </select>
                    </div>
                    <div>
                        <div>
                            <label htmlFor='price'>Price:</label>
                            <input
                                id='price'
                                type='text'
                                onChange={e => setName(e.target.value)}
                                value={price}
                                placeholder='price here'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor='description'>Description:</label>
                        <textarea
                            id='description'
                            type='text'
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                            placeholder='Bio here'
                        />
                    </div>


                </form>
            </div>
        </div>
    )


}


export default CreateSpotForm;