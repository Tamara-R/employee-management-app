import React, { Fragment, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Header from '../layout/Header';
import MetaData from '../layout/MetaData';

import { getUserDetails, clearError } from '../../redux/actions/authActions';



const UserDetails = ({ history, match }) => {
	
	
	const dispatch = useDispatch();

	const { user, error } = useSelector(state => state.userDetails);

	const userId = match.params.id;
	
	useEffect(() => {

		
		dispatch(getUserDetails(userId));
		

		if (error) {
			alert.error(error);
			dispatch(clearError());
		}

		
	}, [dispatch, alert, error, userId, user]);

	
	

	return (
		<Fragment>
			<MetaData title={`${user.fullName}`} />
			<Header />
			<div className='ui segment'>
            <div className="ui grid">

            <div className="five wide column">
                <div className="ui clearing segment">
                      <div className='ui container'>
                          
                          <img className="ui medium rounded image" src={user.avatar?.url} alt={user.username} />
                          
                      </div>
                  </div>
              </div>
              <div className='six wide column'>
              <div className="ui clearing segment">
                      <div className='ui container'>
                          <h3>Basic informations</h3>
                          <h4>Full Name</h4>
                          <p>{user.fullName}</p>
                          <hr/>
                          <h4>Email Adress</h4>
                          <p>{user.email}</p>
                          <hr />
                          <h4>Phone No.</h4>
                          <p>{user.phoneNo}</p>
                          
                      </div>
                  </div>
              </div>
              <div className="five wide column">
                  <div className="ui clearing segment">
                      <div className='ui container'>
                      <h3>Other informations</h3>
                          <h4>Username</h4>
                          <p>{user.username}</p>
                          <hr />
                          <h4>Role</h4>
                          <p>{user.role}</p>
                          <hr />
                          <h4>Date of Birth</h4>
                          <p>{user.dateOfBirth}</p>
                          
                      </div>
                  </div>
                
              </div>
          
              
              
            </div>
          </div>
		</Fragment>
	);
}

export default UserDetails;