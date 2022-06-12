import React, { useContext, useEffect } from 'react';
import AuthContext from '../contexts/auth.context';
import { infoStore } from '../store/info.store';
import { PagesLinkComponent } from './pagesLink.component';
import { ProfileDropDownComponent } from './profileDropDown.component';
import { ThemeSelectorComponent } from './themeSelector.component';
import { } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export function NavbarComponent() {
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><PagesLinkComponent /></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost normal-case text-xl">{infoStore.brandName.fa}</a>
            </div>
            <div className="navbar-end">
                {/* row  */}
                <div className="flex">
                    <div className="flex-1">
                        <ThemeSelectorComponent />
                    </div>
                    <div className="flex">
                        {isAuthenticated ? <ProfileDropDownComponent /> :
                            <button className="btn btn-ghost">
                                <Link to='/login'>
                                    <FontAwesomeIcon icon={['fas', 'sign-in-alt']} className='mr-2' />
                                    ورود
                                </Link>
                            </button>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}