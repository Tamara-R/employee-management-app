import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import { updatePassword, clearError } from '../../redux/actions/authActions';
import { UPDATE_PASSWORD_RESET } from '../../constants/authConstants';

import MetaData from '../layout/MetaData';
import Header from '../layout/Header';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setNewPassword] = useState('');
    const [ emptyError, setEmptyError ] = useState('');

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
  
    const { loading, error, isUpdated } = useSelector(state => state.user);
  
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    
        if (isUpdated) {
            alert.success('Password has been updated!');
            
            history.push('/home');
            dispatch({type: UPDATE_PASSWORD_RESET});
        }
    }, [dispatch, isUpdated, error, history, alert]);

    const handleSubmit = e => {
        e.preventDefault();

        if( password.trim() === '' || oldPassword.trim() === '' ) {
            setEmptyError('Required field!');  
        }

        dispatch(updatePassword({ oldPassword, password }));
    }

    return (
        <Fragment>
            <MetaData title={"Change Password"} />
            <Header />
            <div className='ui clearing segment'>
                <h4 className="ui dividing header">Change Password</h4>
                <form onSubmit={handleSubmit} className='ui form' autoComplete='off'>
                    <div className="field">
                        <label>Current Password</label>
                        <input 
                            type="password"
                            name="password" 
                            placeholder="Current Password" 
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                        />
                        <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                    </div>
                    <div className="field">
                        <label>New Password</label>
                        <input 
                            type="password"
                            name="password" 
                            placeholder="New Password" 
                            value={password}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                    </div>
                    <button type="submit" disabled={loading ? true : false} className="ui right floated button">Update Password</button>
                </form>
            </div>
        </Fragment>
    )
}

export default ChangePassword
