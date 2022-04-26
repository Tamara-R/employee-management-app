import React, { Fragment, useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../layout/Header';
import MetaData from '../layout/MetaData';

import { updateUser, getUserDetails, clearError } from '../../redux/actions/authActions';
import { UPDATE_USER_RESET } from '../../constants/authConstants';


export default function UpdateUser({ history, match }) {
	
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ fullName, setFullName ] = useState('');
	const [ phoneNo, setPhoneNo ] = useState('');
	const [ dateOfBirth, setDateOfBirth ] = useState('');
	const [ role, setRole ] = useState('');
	const [ status, setStatus ] = useState('');

	const alert = useAlert();
	const dispatch = useDispatch();

	const { error, isUpdated } = useSelector(state => state.adminUser);
	const { user } = useSelector(state => state.userDetails);

	const userId = match.params.id;
	
	useEffect(() => {


		if (user && user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setUsername(user.username);
			setEmail(user.email);
			setFullName(user.fullName);
			setPhoneNo(user.phoneNo);
			setDateOfBirth(user.dateOfBirth);
			setRole(user.role);
			setStatus(user.status);
		}

		if (error) {
			alert.error(error);
			dispatch(clearError());
		}

		if (isUpdated) {
			alert.success('User updated successfully');

			history.push('/admin/users');

			dispatch({type: UPDATE_USER_RESET});
		}
	}, [dispatch, alert, error, history, isUpdated, userId, user]);

	
	
    const updateHandler = e => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.set('username', username);
        // formData.set('email', email);
		// formData.set('fullName', fullName);
		// formData.set('phoneNo', phoneNo);
		// formData.set('dateOfBirth', dateOfBirth);
        // formData.set('role', role);
        dispatch(updateUser(match.params.id, { username, email, fullName, phoneNo, dateOfBirth, role, status }));
    }

	return (
		<Fragment>
			<MetaData title={`Update ${user.fullName}`} />
			<Header />
			<div className='ui clearing segment'>
				<form onSubmit={updateHandler} className='ui form'>
					<h4 className="ui dividing header">Update User informations</h4>
					<div className="two fields">
						<div className="field">
							<label>Username</label>
							<input 
								type="text"
								name="username" 
								placeholder="Username" 
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
						</div>
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
					</div>
					<div className="three fields">
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
						<div className="field">
							<label>Role</label>
							<select
								name='role'
								value={role}
								onChange={e => setRole(e.target.value)}
							>
								<option disabled={true} >Select role</option>
								<option value='user'>User</option>
								<option value='admin'>Admin</option>
								<option value='manager'>Manager</option>
							</select>
						</div>
						<div className="field">
							<label>Status</label>
							<select
								name='status'
								value={status}
								onChange={e => setStatus(e.target.value)}
							>
								<option disabled={true}>Select status</option>
								<option value='active'>Active</option>
								<option value='deactivated'>Deactivated</option>
								
							</select>
						</div>
					</div>
					<button className="ui right floated button" type="submit">Update User</button>
				</form>
			</div>
		</Fragment>
	);
}