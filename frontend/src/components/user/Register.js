import React, {useState, useEffect, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import {Link, useHistory} from 'react-router-dom';

import MetaData from '../layout/MetaData';
import { register, sendConfirmationEmail, clearError } from '../../redux/actions/authActions';


const Register = () => {

    const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordRepeat, setPasswordRepeat ] = useState('');
	const [ fullName, setFullName ] = useState('');
	const [ phoneNo, setPhoneNo ] = useState('');
	const [ dateOfBirth, setDateOfBirth ] = useState('');
    const [ emptyError, setEmptyError ] = useState('');


    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    
    const { error, success } = useSelector(state => state.auth);

    useEffect(() => {
        
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    }, [dispatch, history, alert, error]);

    const emptyState = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordRepeat('');
        setFullName('');
        setPhoneNo('');
        setDateOfBirth('');
    }

    const onSubmit = e => {
        e.preventDefault();
        
        if( username.trim() === '' || email.trim() === '' || password.trim() === '' || passwordRepeat.trim() === ''  ) {
            setEmptyError('Required field!');   
        }
        dispatch(register({ username, email, password, fullName, phoneNo, dateOfBirth }));
        emptyState();
        alert.success('Registation successful!');
        alert.success('Check your email to verify account!');  
    }

    const sendEmail = e => {
        e.preventDefault();

        if(email.trim() === '') {
            setEmptyError('Required field!');  
        }
        dispatch(sendConfirmationEmail({email}))
        // history.push('/');
        emptyState();
        alert.success('Email has been sent!');
        alert.success('Check your email to verify account!');  
    }


    return (
        <Fragment>
            <MetaData title={"Registration"} />
            <div className="row wrapper">
                <div className="col-10 col-lg-6">
                    <div className='ui placeholder segment'>
                        <img src="/images/task_management.jpg" alt="logo" className='ui centered medium image'/>
                        <h3 className="ui centered dividing header">Register</h3>  
                            <form onSubmit={onSubmit} className='ui form' autoComplete='off'>
                                <div className='ui field'>
                                        <div className="ui left icon input">
                                        <input
                                            className="ui field"
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                        <i className="user icon"></i>  
                                    </div>
                                    <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                                </div>
                                <div className='ui field'>
                                        <div className="ui left icon input">
                                        <input
                                            className="ui field"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <i className="envelope icon"></i>  
                                    </div>
                                    <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                                </div>
                                <div className='ui field'>
                                        <div className="ui left icon input">
                                        <input
                                            className="ui field"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        <i className="lock icon"></i>  
                                    </div>
                                    <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                                </div>
                                <div className='ui field'>
                                        <div className="ui left icon input">
                                        <input
                                            className="ui field"
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={passwordRepeat}
                                            onChange={e => setPasswordRepeat(e.target.value)} 
                                        />
                                        <i className="lock icon"></i>  
                                    </div>
                                    <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                                </div>
                                { password !== passwordRepeat && (
                                    
                                    <div className='mt-2 mb-2' style={{ 'color' : 'red' }}>Passwords do not match!</div>
                                    
                                )}
                                <div className='ui field'>
                                        <div className="ui left icon input">
                                        <input
                                            className="ui field"
                                            type="text"
                                            name="fullName"
                                            placeholder="Full Name"
                                            value={fullName}
                                            onChange={e => setFullName(e.target.value)} 
                                            
                                        />
                                        <i className="user icon"></i>  
                                    </div>
                                    <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                                    
                                </div>
                                <div className='ui field'>
                                        <div className="ui left icon input">
                                        <input
                                            className="ui field"
                                            type="text"
                                            name="phoneNo"
                                            placeholder="Phone Number"
                                            value={phoneNo}
                                            onChange={e => setPhoneNo(e.target.value)} 
                                        />
                                        <i className="phone icon"></i>  
                                    </div>
                                </div>
                                <div className='ui field'>
                                        <div className="ui left icon input">
                                        <input
                                            className="ui field"
                                            type="text"
                                            name="dateOfBirth"
                                            placeholder="Date of Birth"
                                            value={dateOfBirth}
                                            onChange={e => setDateOfBirth(e.target.value)} 
                                        />
                                        <i className="calendar icon"></i>  
                                    </div>
                                </div>
                                <button className="ui right floated button" type="submit">Register</button>
                            </form> 
                            {success && success === true && (
                                <div className="btn btn-block pb-2">
                                    <button type="button" className="btn btn-link py-1 px-1 ml-2 mt-1" data-toggle="modal" data-target="#exampleModalCenter">
                                        Request Another E-mail Confirmation
                                    </button>
                                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLongTitle">E-mail Confirmation Request</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                            <div class="modal-body">
                                                <div className='ui field'>
                                                    <p>Enter Your E-mail</p>
                                                    <div className="ui left icon input">  
                                                        <input
                                                            className="ui field"
                                                            type="email"
                                                            name="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={e => setEmail(e.target.value)}
                                                        />
                                                        <i className="envelope icon"></i>  
                                                    </div>
                                                    <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                                <button type="button" class="btn btn-primary" onClick={sendEmail} data-dismiss="modal">Send Email</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )} 
                        <div className="ui left aligned container"><Link className="ui tiny blue header" to='/'>Go Back</Link></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Register
