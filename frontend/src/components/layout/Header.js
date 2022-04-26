import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';


const Header = () => {

    const { user }  = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const alert = useAlert();

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('You are logged out!');
    }

    return (
        <Fragment>
            <div className="ui horizontal divider">
                <span className="ui item">{user && user.fullName}</span>
            </div>
            <div className="ui secondary pointing menu">
                <Link className="item" to='/home'>
                    Profile
                </Link>
                { user && user.role === 'admin' && (
                    <Link className="item" to='/admin/users'>
                        Users
                    </Link>
                )}
                { user && user.role !== 'user' && (
                    <Link className="item" to='/groups'>
                        Groups
                    </Link>
                )}
                { user && user.role !== 'user' && (
                    <Link className="item" to='/assignments'>
                        Assignments
                    </Link>
                )}

                { user && user.role === 'user' && (
                    <Link className="item" to='/my'>
                        My Assignments
                    </Link>
                )}
                { user && user.role === 'user' && (
                    <Link className="item" to='/filter-leaders'>
                        All Assignments
                    </Link>
                )}
                { user && user.role === 'admin' && (
                    <Link className="item" to='/comments'>
                        Comments
                    </Link>
                )}
                
                
                <div className="right menu">
                        <img
                            src={user.avatar && user.avatar.url}
                            alt={user && user.username}
                            className='ui mini circular image'
                        />
                        
                        <Link className="ui item" to='/' onClick={logoutHandler} >
                            Logout
                        </Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Header
