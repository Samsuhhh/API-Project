// frontend/src/components/SignupFormPage/index.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import '../CreateSpotForm/CreateSpotForm.css'


function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const vErrors = [];
        if (!firstName || firstName.length < 2) {
            vErrors.push('First Name must be greater than 1 characters.')
        };
        if (!lastName || lastName.length < 2) {
            vErrors.push('Last name must be greater than 1 characters.')
        };
        if (!email || !email.includes('@') || !email.includes('.')) {
            vErrors.push('Email must be a valid email.')
        };
        if (!username || username.length < 5) {
            vErrors.push('Username must be greater than 5 characters.')
        };
        if (!password || password.length < 8) {
            vErrors.push('Password must be at least 8 characters.')
        };
        if (password.length !== confirmPassword.length) {
            vErrors.push('Password fields must match!')
        }

        setErrors(vErrors)
    }, [firstName, lastName, email, username, password, confirmPassword])

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    console.log('dataata', data)
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Password fields must match!']);
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
                    {errors.length > 0 && errors.map((error) => {
                        return <li id='list-error' key={error}>{error}</li>
                    })}
                    {errors.length === 0 && (
                        <li id='allclear-message'>Welcome to AirNbN</li>
                    )}
                </ul>
            </div>


            <div id='signup-form'>

                <div id='form-styling'>
                    <div id='create-h1-header-signup'>
                        <h1 style={{ fontWeight: 400 }}>Please provide your information</h1>
                    </div>


                    <form className='createForm-inputs-div' onSubmit={handleSubmit}>

                        <div className='createForm-inputs-div' >
                            <input
                                id='createName'
                                className='createSpot-input'
                                type='text'
                                onChange={e => setFirstName(e.target.value)}
                                value={firstName}
                                placeholder='First name'
                                required
                            />
                        </div>
                        <div className='createForm-inputs-div' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setLastName(e.target.value)}
                                value={lastName}
                                placeholder='Last name'
                                required
                            />
                        </div>
                        <div className='createForm-inputs-div' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                placeholder='Email'
                                required
                            />
                        </div>
                        <div className='createForm-inputs-div' >
                            <input
                                className='createSpot-input'
                                type='text'
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                                placeholder='Username'
                                required
                            />
                        </div>
                        <div className='createForm-inputs-div' >

                            <input
                                id='number-input'
                                className='createSpot-input'
                                type='password'
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                placeholder='Password'
                                required
                            />
                        </div>
                        <div className='createForm-inputs-div' >
                            <input
                                className='createSpot-input'
                                id='confirm-password'
                                type='password'
                                onChange={e => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                placeholder='Confirm password'
                                required
                            />
                        </div>

                        <div id='create-buttons'>
                            <button
                                className='createSpot-buttons'
                                disabled={errors.length > 0 ? true : false}
                            >Sign up</button>
                            <button
                                className='createSpot-buttons'
                                onClick={cancelHandler}>Cancel</button>

                        </div>
                    </form>
                </div>

            </div>



        </div>



        // old signup

        // <div id='signup-container'>

        //     <div id='signup-form'>
        //         <br></br>
        //             Welcome to AirNbN
        //         <form onSubmit={handleSubmit}>
        //             <ul>
        //                 {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        //             </ul>
        //             <div  className='input'>
        //                 First Name: 
        //                 <input
        //                     type="text"
        //                     value={firstName}
        //                     onChange={(e) => setFirstName(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className='input'>
        //                 Last Name:
        //                 <input
        //                     type="text"
        //                     value={lastName}
        //                     onChange={(e) => setLastName(e.target.value)}
        //                     required
        //                 />
        //             </div>

        //             <div className='input'>
        //                 Email:
        //                 <input
        //                     type="text"
        //                     value={email}
        //                     onChange={(e) => setEmail(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className='input'>
        //                 Username:
        //                 <input
        //                     type="text"
        //                     value={username}
        //                     onChange={(e) => setUsername(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className='input'>
        //                 Password:
        //                 <input
        //                     type="password"
        //                     value={password}
        //                     onChange={(e) => setPassword(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className='input'>
        //                 Confirm Password:
        //                 <input
        //                     type="password"
        //                     value={confirmPassword}
        //                     onChange={(e) => setConfirmPassword(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <br></br>
        //             <button type="submit">Sign Up</button>
        //         </form>
        //     </div>
        // </div>
    );
}

export default SignupFormPage;