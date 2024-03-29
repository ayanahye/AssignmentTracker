import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';
import "../styles/Header.css";
import logo from '../AssignmentTracker-thumb.png';

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // get user from auth state
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>
                    <img src={logo} alt="Logo" style={{height: '40px'}}/>
                </Link>
            </div>
            <ul class="link-ele">
                {user ? (
                    <li>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt />Logout
                        </button>
                    </li>
                ) : (
                <>
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt />Login
                        </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                            <FaUser />Register
                        </Link>
                    </li>
                </>
                )}
                
            </ul>
        </header>
    )
}

export default Header