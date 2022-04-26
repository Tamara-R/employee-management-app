import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, isAdminManager, isManagerUser, isManager, isUser, component: Component, ...rest }) => {

    const {loading, isAuthenticated, user} = useSelector(state => state.auth);

    return (
        <Fragment>
        {
            loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        
                        if (isAuthenticated === false) {
                            return <Redirect to='/' />
                        }

                        if (isAdmin === true && user.role !== 'admin') {
                            return <Redirect to='/home' />
                        }

                        if (isAdminManager === true && user.role === 'user') {
                            return <Redirect to='/home' />
                        }

                        if (isManagerUser === true && user.role === 'admin') {
                            return <Redirect to='/home' />
                        }

                        if (isManager === true && user.role !== 'manager') {
                            return <Redirect to='/home' />
                        }

                        if (isUser === true && user.role !== 'user') {
                            return <Redirect to='/home' />
                        }

                        return <Component {...props} />
                    
                    }}
                />
            )
        }
        </Fragment>
    )
}

export default ProtectedRoute;