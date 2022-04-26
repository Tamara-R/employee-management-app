import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Header from '../layout/Header';

const Home = () => {

  const { user, loading } = useSelector(state => state.auth);
  return (
    <>
    {
      loading ? <Loader /> : (
        <Fragment>
          <MetaData title={`${user.fullName}`} />
          <Header/>
          <div className='ui segment'>
            <div className="ui grid">

            <div className="five wide column">
                <div className="ui clearing segment">
                      <div className='ui container'>
                          
                          <img className="ui medium rounded image" src={user.avatar?.url} alt={user.username} />
                          
                          <Link to='/update' id="edit_profile" className="btn btn-primary btn-block mb-2">
                              Edit Profile
                          </Link>
                          <Link className="btn btn-primary btn-block " to='/password'>
                              Change Password
                          </Link>
                      
                      </div>
                  </div>
              </div>
              <div className='six wide column'>
              <div className="ui clearing segment">
                      <div className='ui container'>
                          <h3>Basic informations</h3>
                          <h4>Full Name</h4>
                          <p>{user.fullName}</p>
                          <hr />
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
      )
    }
    </>
  )
}

export default Home;