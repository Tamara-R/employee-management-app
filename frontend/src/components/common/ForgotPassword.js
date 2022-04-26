import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import { forgotPassword, clearError } from '../../redux/actions/authActions';
import { FORGOT_PASSWORD_CLEAR } from '../../constants/authConstants';


const ForgotPassword = () => {

    const [ email, setEmail ] = useState('');
    const [ emptyError, setEmptyError ] = useState('');

    const dispatch = useDispatch();
    const alert = useAlert();
    const { message, error } = useSelector(state => state.forgotPassword);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (message) {
            alert.success(message);
            dispatch({type: FORGOT_PASSWORD_CLEAR});
        }

    }, [dispatch, error, alert, message]);

    const onSubmit = e => {
        e.preventDefault();
        if( email.trim() === '' ) {
            setEmptyError('Required field!');   
        }
        dispatch(forgotPassword({email}));
    }
    return (
        <Fragment>    
            <div className="row wrapper"> 
                <div className="col-10 col-lg-6">
                    <div className='ui placeholder segment'>
                        <img src="/images/task_management.jpg" alt="logo" className='ui centered medium image'/>
                        <h3 className="ui centered dividing header">Request New Password</h3>
                        <form onSubmit={onSubmit} className="ui form" >
                            <div className="ui field">
                                <div className="ui left icon input">
                                    <input 
                                        className="ui field"
                                        type="email" 
                                        id="email"
                                        name='email' 
                                        placeholder="E-mail"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)} 
                                    />
                                    <i className="envelope icon"></i> 
                                </div>
                                <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                            </div>                                                      
                            <button className="ui right floated button" type="submit">Request New Password</button>
                        </form>
                        <div className="ui left aligned container"><Link className="ui tiny blue header" to='/'>Go Back</Link></div>
                    </div>
                </div>
            </div>
        </Fragment>
        
    )
}

export default ForgotPassword
