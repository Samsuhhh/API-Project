// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const spotDetails = useSelector(state => state.spots.singleSpot);
    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (



        <div className='header'>
            <div>
                <img alt='blue airBnB logo' className='logo' src='https://assets.entrepreneur.com/article/1405623476-airbnb-logo-explanation.jpg' />
            </div>

            <div>

                <div className='dropdown'>
                    <button className='access-granted-btn'> fix me :(
                        {/* <img alt='hamburger menu' src='../../assets/icons8-menu-30.png' /> */}
                    </button >
                </div>
                <div className='dropdown-content'>
                    {isLoaded && sessionLinks}
                    <div>
                        <NavLink exact to="/">Home</NavLink>
                    </div>
                    <div>
                        {sessionUser && (
                            <NavLink to='/spots/new'>Host Your Spot</NavLink>
                        )}
                    </div>
                </div>
            </div>

            {/* <div id='filter-space'>space</div> */}
        </div>

    );

}

export default Navigation;