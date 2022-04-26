import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

import { resetPassword, clearError } from '../../redux/actions/authActions';

const ResetPassword = ({ match }) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {error, success} = useSelector(state => state.forgotPassword);
    const [ emptyError, setEmptyError ] = useState('');

    useEffect(() => {
        if (error) {
        alert.error(error);
        dispatch(clearError());
        }

        if (success) {
        alert.success('Password has been changed!');
        history.push('/login');
        }
    }, [dispatch, error, success, alert, history]);

    const onSubmit = e => {
        e.preventDefault();
        
        if( password.trim() === '' || confirmPassword.trim() === ''  ) {
            setEmptyError('Required field!');   
        }
        dispatch(resetPassword(match.params.token, {password, confirmPassword }));
    }


    return (
        <Fragment>          
            <div className="row wrapper"> 
                <div className="col-10 col-lg-6">
                    <div className='ui placeholder segment'>
                        <img src="/images/task_management.jpg" alt="logo" className='ui centered medium image'/>
                        <h3 className="ui centered dividing header">Reset Password</h3>
                        <form onSubmit={onSubmit} className="ui form" >
                            <div className="ui field">
                                <div className="ui left icon input">
                                    <input 
                                        className="ui field"
                                        type="password" 
                                        id="password" 
                                        placeholder="New Password" 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <i className="lock icon"></i> 
                                </div>
                                <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                            </div>

                            <div className="ui field">
                                <div className="ui left icon input">
                                    <input 
                                        className="ui field"
                                        type="password" 
                                        id="confirmPassword" 
                                        placeholder="Confirm Password" 
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                    <i className="lock icon"></i> 
                                </div>
                                <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                            </div>

                            { password !== confirmPassword && (
                                    
                                <div className='mt-2 mb-2' style={{ 'color' : 'red' }}>Passwords do not match!</div>
                                    
                            )}
                            
                            <button className="ui right floated button" type="submit">Reset Password</button>
                        </form>
                        <div className="ui left aligned container"><Link className="ui tiny blue header" to='/'>Go Back</Link></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ResetPassword
