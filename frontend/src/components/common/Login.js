import React, { Fragment, useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';


import { login, clearError } from '../../redux/actions/authActions';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ emptyError, setEmptyError ] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const { isAuthenticated, error} = useSelector(state => state.auth);

    

    useEffect(() => {
        if (isAuthenticated)
          history.push('/home');
    
        if (error) {
          alert.error(error);
          dispatch(clearError());
        }
    }, [dispatch, isAuthenticated, error, alert ]);

    const handleSubmit = e => {
        e.preventDefault();
        if( email.trim() === '' || password.trim() === '' ) {
            setEmptyError('Required field!');   
        }
        dispatch(login(email, password));
    }
    
    return ( 
        
        <Fragment>
            
            <div className="row wrapper"> 
                <div className="col-10 col-lg-6">
                    <div className='ui placeholder segment'>
                        <img src="/images/task_management.jpg" alt="logo" className='ui centered medium image'/>
                        <h3 className="ui centered dividing header">Login</h3>
                        <form onSubmit={handleSubmit} className="ui form" >
                            <div className="ui field">
                                <div className="ui left icon input">
                                    <input 
                                        className="ui field"
                                        type="email" 
                                        id="email" 
                                        placeholder="E-mail"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)} 
                                    />
                                    <i className="envelope icon"></i> 
                                </div>
                                <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                            </div>
                            <div className="ui field">
                                <div className="ui left icon input">
                                    <input 
                                        className="ui field"
                                        type="password" 
                                        id="password" 
                                        placeholder="Password" 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <i className="lock icon"></i> 
                                </div>
                                <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                            </div>
                            <Link to='/forgotpassword' >Forgot Password?</Link>
                            <button className="ui right floated button" type="submit">Login</button>
                        </form>
                        <div className="ui left aligned container"><Link className="ui tiny blue header" to='/'>Go Back</Link></div>
                    </div>
                </div>
            </div>
        </Fragment>
        
    )
}

export default Login
