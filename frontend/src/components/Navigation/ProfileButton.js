import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const dropdownClass = () => {
        if (showMenu) {
            return 'home-dropdownMenu-visible';
        } else {
            return 'home-dropDownMenu-hidden';
        }
    }

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => setShowMenu(false);
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);

    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (

        <div className='main-dropdown-container'>
            <button
                className='home-button-dropdown'
                onClick={openMenu}
            >
                <img alt='none' src='https://www.pngrepo.com/png/313139/512/hamburger-menu.png' id='menu' />
                <img alt='none' src='https://www.pngrepo.com/png/415804/180/user-profile-avatar.png' id='avatar' />
            </button>
            {showMenu && (
                <div className={dropdownClass()}>
                    <div className="sessionLinks-styling">{user.username}</div>
                    <div className="sessionLinks-styling">{user.email}</div>
                    <div id="logout" className="sessionLinks-styling" onClick={logout}>Log out</div>
                </div>
            )}


        </div>

        // <>
        //     <button onClick={openMenu}>
        //         <i className="fas fa-user-circle" />
        //     </button>
        //     {showMenu && (
        //         <div className="profile-dropdown">
        //             <div>{user.username}</div>
        //             <div>{user.email}</div>
        //             <div>
        //                 <button onClick={logout}>Log Out</button>
        //             </div>
        //         </div>
        //     )}
        // </>
    );
}

export default ProfileButton;