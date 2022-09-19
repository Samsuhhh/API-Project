// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

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
            <div className='nav-bar'>
                <div >
                    <img alt='blue airBnB logo' className='logo' src='https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo-2008.jpg' />
                </div>
                <div></div>
                <div className='dropdown'>
                    <button className='access-granted-btn'> dropdown pls
                        {/* <img alt='hamburger menu' src='../../assets/icons8-menu-30.png' /> */}
                    </button >

                    <div className='dropdown-content'>
                        <div>
                            <NavLink exact to="/">Home</NavLink>
                            {isLoaded && sessionLinks}
                        </div>
                    </div>
                </div>
            </div>
            <div id='filter-space'>space</div>
        </div>

    );

}

export default Navigation;