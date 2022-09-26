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
    const dropdownClass2 = showMenu ? 'home-dropdownMenu-visible' : 'home-dropDownMenu-hidden';

    const openMenu = () => {
        if (showMenu) return setShowMenu(false);
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => setShowMenu(false);
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);

    }, [showMenu]);


    if (sessionUser) {
        sessionLinks = (
            // <div className={dropdownClass()}>
            <>
                <ProfileButton user={sessionUser} />
                <NavLink id='navBar-host' to='/spots/new'>Become a host</NavLink>
            </>
        );
    } else {
        sessionLinks = (

            <div className='main-dropdown-container'>
                <button
                    className='home-button-dropdown'
                    onClick={openMenu}
                >
                    <img alt='none' src='https://www.pngrepo.com/png/313139/512/hamburger-menu.png' id='menu' />
                    <img alt='none' src='https://www.pngrepo.com/png/415804/180/user-profile-avatar.png' id='avatar' />
                </button>

                {/* {showMenu && ( */}

                <div className={dropdownClass2}  >
                    <LoginFormModal />
                    <NavLink to="/signup">Sign Up</NavLink>
                </div >

                {/* )} */}
            </div >

        );
    }


    return (
        <div className='header'>
            <div className='nav-bar'>

                <NavLink to='/'>
                    <img alt='airnbn logo' id='logo' src='https://i.imgur.com/ekbo9fd.png' />
                </NavLink>
                {/* <button className='access-granted-btn'> fix me :( */}

                {/* <img alt='hamburger menu' src='../../assets/icons8-menu-30.png' /> */}
                {/* </button > */}
                <div >
                    {/* {isLoaded && sessionLinks} */}
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