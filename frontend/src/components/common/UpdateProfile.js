import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import { loadUser, updateProfile, clearError } from '../../redux/actions/authActions';
import { UPDATE_PROFILE_RESET } from '../../constants/authConstants';
import Header from '../layout/Header';
import MetaData from '../layout/MetaData';

const UpdateProfile = () => {

    const [ email, setEmail ] = useState('');
    const [ fullName, setFullName ] = useState('');
    const [ phoneNo, setPhoneNo ] = useState('');
    const [ dateOfBirth, setDateOfBirth ] = useState('');
    const [ avatar, setAvatar ] = useState('');
    const [ avatarPreview, setAvatarPreview ] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated } = useSelector(state => state.user);

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setFullName(user.fullName);
            setPhoneNo(user.phoneNo);
            setDateOfBirth(user.dateOfBirth);
            setAvatarPreview(user.avatar?.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (isUpdated) {
            alert.success('Profile has been udpated!');
            dispatch(loadUser());
            history.push('/home');
            dispatch({type: UPDATE_PROFILE_RESET});
        }
    }, [dispatch, error, isUpdated, history, alert, user]);

    const onChange = e => {
        const reader = new FileReader();
        reader.onload = () => {
        if (reader.readyState === 2) {
            setAvatar(reader.result);
            setAvatarPreview(reader.result);
        }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const onSubmit = e => {
        e.preventDefault();   
        dispatch(updateProfile({email, fullName, phoneNo, dateOfBirth, avatar }));
    }
    return (
        <Fragment>
			<MetaData title={`Update User`} />
			<Header />
			<div className='ui clearing segment'>
				<form onSubmit={onSubmit} className='ui form'>
					<h4 className="ui dividing header">Update Profile</h4>
					<div className="two fields">
						<div className="field">
							<label>E-mail adress</label>
							<input 
								type="email"
								name="email" 
								placeholder="E-mail adress" 
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className="field">
							<label>Full Name</label>
							<input 
								type="text" 
								name="fullName" 
								placeholder="Full Name"
								value={fullName}
								onChange={e => setFullName(e.target.value)}
							/>
						</div>
					</div>
					<div className="two fields">				
						<div className="field">
							<label>Phone Number</label>
							<input 
								type="text" 
								name="phoneNo" 
								placeholder="Phone Number"
								value={phoneNo}
								onChange={e => setPhoneNo(e.target.value)}
							/>
						</div>
                        <div className="field">
							<label>Date of Birth</label>
							<input 
								type="text"
								name="dateOfBirth" 
								placeholder="Date of Birth" 
								value={dateOfBirth}
								onChange={e => setDateOfBirth(e.target.value)}
							/>
						</div>
					</div>
                    <div className="two fields">
                        <div className='field'>
                            <label htmlFor='avatar_upload'>Profile Picture</label>
                            <div className='d-flex align-items-center mb-3'>
                                <div>
                                    <figure className='avatar mb-3 ml-3'>
                                    <img
                                        src={avatarPreview}
                                        className='rounded-circle'
                                        alt='Avatar Preview'
                                    />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Picture
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
					
					<button className="ui right floated button" type="submit">Upadate Profile</button>
				</form>
			</div>
		</Fragment>
    )
}

export default UpdateProfile
