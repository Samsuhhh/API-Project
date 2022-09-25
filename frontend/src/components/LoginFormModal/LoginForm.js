// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    const handleDemo = (e) => {
        e.preventDefault();

        return dispatch(sessionActions.login({ credential: 'Demo-lition', password:'password12' })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    }


    return (
        <div id='login-form-container'>

            <form id='loginForm-form' onSubmit={handleSubmit}>

                <div id='login-error-handling-div'>
                    <ul>
                        {!errors.length && errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                </div>
                <div id='username-div' className='login-input-div'>
                    <input
                        id='credential-input'
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        placeholder='Username or Email'
                        required
                    />
                </div>

                <div id='password-div' className='login-input-div'>

                    <input
                        id='password-input'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                    />
                </div>

                <button id='loginBtn' type="submit">Log In</button>

                <button type="submit"
                    id='demoBtn'
                    onClick={handleDemo}
                >
                    Log in as Demo User
                </button>

            </form>


        </div>
    );
}

export default LoginForm;