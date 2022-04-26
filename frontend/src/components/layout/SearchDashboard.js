import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SearchDashboard = () => {

    const { user }  = useSelector(state => state.auth);


    return (
        <Fragment>
            <div className='ui secondary pointing menu'>
                { user && user.role === 'manager' && (
                    <Link className="item" to='/filter-title'>
                        Search By Title
                    </Link>
                )}
                { user && user.role !== 'admin' && (
                    <Link className="item" to='/filter-leaders'>
                        Filter By Team Lead
                    </Link>
                )}
                { user && user.role !== 'admin' && (
                    <Link className="item" to='/filter-employees'>
                        Filter By Team Members
                    </Link>
                )}
                { user && user.role === 'manager' && (
                    <Link className="item" to='/filter-priority'>
                        Filter By Priority
                    </Link>
                )}
                { user && user.role === 'manager' && (
                    <Link className="item" to='/filter-startdate'>
                        Filter By Start Date
                    </Link>
                )}
                { user && user.role !== 'admin' && (
                    <Link className="item" to='/filter-enddate'>
                        Filter By End Date
                    </Link>
                )}
                
                
            </div>
        </Fragment>
    )
}

export default SearchDashboard
