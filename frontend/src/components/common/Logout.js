import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';

import { logout } from '../../redux/actions/authActions';


const Logout = ({history}) => {

    
    const dispatch = useDispatch();
    const alert = useAlert();

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('You are logged out!');
    }

    
    return (
        <Fragment>
            <Link className="ui item" to='/' onSubmit={logoutHandler}>
                Logout
            </Link>
        </Fragment>
    )
}

export default Logout
