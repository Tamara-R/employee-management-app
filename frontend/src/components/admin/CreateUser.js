import React, { useState, useEffect, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import Header from '../layout/Header';
import MetaData from '../layout/MetaData';

import { clearError, createUser } from '../../redux/actions/authActions';

const CreateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const { error, success } = useSelector(state => state.newUser);


    const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
	const [ fullName, setFullName ] = useState('');
	const [ phoneNo, setPhoneNo ] = useState('');
	const [ dateOfBirth, setDateOfBirth ] = useState('');
	const [ role, setRole ] = useState('');
	const [ emptyError, setEmptyError ] = useState('');

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (success) {
            history.push('/admin/users');
            alert.success('User has been created!');

        }
    }, [dispatch, history, alert, error, success]);

    
    
    const handleSubmit = e => {
        e.preventDefault();

		if( username.trim() === '' || email.trim() === '' || password.trim() === '' ||  role.trim() === '' ) {
            setEmptyError('Required field!');   
        }
        
        dispatch(createUser({username, email, password, fullName, phoneNo, dateOfBirth, role}));
    }

    
    return (
        <Fragment>
            <MetaData title='Create User' />
            <Header />
            <div className='ui clearing segment'>
				<form onSubmit={handleSubmit} className='ui form' autoComplete='off'>
					<h4 className="ui dividing header">Create New User</h4>
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
							<div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
						</div>
						<div className="field">
							<label>E-mail Adress</label>
							<input 
								type="email" 
								name="email" 
								placeholder="E-mail Adress"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
							<div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
						</div>
					</div>
					<div className="two fields">
                        <div className="field">
							<label>Password</label>
							<input 
								type="password"
								name="password" 
								placeholder="Password" 
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
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
							<div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
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
                    <div className="field">
						<label>Role</label>
						<select
							name='role'
							value={role}
							onChange={e => setRole(e.target.value)}
						>
							<option disabled={true} selected={true}>Select role</option>
							<option value='admin'>admin</option>
							<option value='manager'>manager</option>
						</select>
						<div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
					</div>
					<button className="ui right floated button" type="submit">Create User</button>
				</form>
			</div>
        </Fragment>
    )
}

export default CreateUser
