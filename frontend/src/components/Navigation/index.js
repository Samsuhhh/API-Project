// frontend/src/components/Navigation/index.js
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    // const spotDetails = useSelector(state => state.spots.singleSpot);
    let sessionLinks;

    const [showMenu, setShowMenu] = useState(false);

    const dropdownClass = () => {
        if (showMenu) {
            return 'home-dropdownMenu-visible';
        } else {
            return 'home-dropDownMenu-hidden';
        }
    }

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => setShowMenu(false);
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);

    }, [showMenu]);


    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <div className='main-dropdown-container'>
                    <button
                        className='home-button-dropdown'
                        onClick={(() => showMenu ? setShowMenu(false) : setShowMenu(true))}
                    >
                        <img alt='none' src='https://www.pngrepo.com/png/313139/512/hamburger-menu.png' id='menu' />
                        <img alt='none' src='https://www.pngrepo.com/png/415804/180/user-profile-avatar.png' id='avatar' />

                    </button>

                    <div className={dropdownClass()}>
                        <a href='#'>
                            <LoginFormModal />
                        </a>
                        <NavLink to="/signup">Sign Up</NavLink>
                    </div>
                </div>

            </>
        );
    }


    return (
        <div className='header'>
            <div className='nav-bar'>

                <NavLink to='/'>
                <img alt='airBnB logo' id='logo' src='https://assets.entrepreneur.com/article/1405623476-airbnb-logo-explanation.jpg' />
                </NavLink>
                {/* <button className='access-granted-btn'> fix me :( */}

                {/* <img alt='hamburger menu' src='../../assets/icons8-menu-30.png' /> */}
                {/* </button > */}
                <div >
                    {isLoaded && sessionLinks}
                    {/* <div id='wya'>
                            <NavLink exact to="/">Home</NavLink>
                        </div>
                        <div id='please'>
                            {sessionUser && (
                                <NavLink to='/spots/new'>Host Your Spot</NavLink>
                            )}
                        </div> */}
                </div>



            </div>
            {/* <div id='filter-space'>space</div> */}
            {/* footer goes here */}
        </div>

    );

}

export default Navigation;