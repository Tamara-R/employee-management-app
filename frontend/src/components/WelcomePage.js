import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <Fragment>
            <div className='row wrapper'>
                <div className="col-10 col-lg-6" >
                    <div className='ui clearing segment'>
                        <img src="/images/task_management.jpg" alt="logo" className='ui centered large image'/>
                        <div className='ui center aligned container'>
                            <hr/>
                            <div className='ui list'>
                                <div className='ui center aligned container'>
                                    <div className='mt-5'>
                                        <div className='item'>
                                            <i className="hand point right outline icon"></i>
                                            <Link to='/login' className="ui medium blue header">Login</Link>
                                        </div>
                                    </div>
                                    <div className='mt-4 mb-3'>
                                        <div className='item'>
                                            <i className="hand point right outline icon"></i>
                                            <Link to='/register' className="ui medium teal header">Register</Link>
                                        </div>
                                    </div>
                                </div>                       
                            </div>               
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default WelcomePage
