import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";

import MetaData from '../layout/MetaData';
import Header from '../layout/Header';
import Loader from '../layout/Loader';
import SearchDashboard from '../layout/SearchDashboard';

import { getAllAssigments, sortByEmployeesAssigments, descByEmployeesAssigments, clearError } from '../../redux/actions/assignmentActions';
import { allUsers } from '../../redux/actions/authActions';


const FilterEmployees = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const [ employee, setEmployee ] = useState('');
    const { assigments, error, loading } = useSelector(state => state.allAssignments);
    const { users } = useSelector(state => state.allUsers);
    const { user } = useSelector(state => state.auth);
   

    useEffect(() => {

		dispatch(getAllAssigments());
        dispatch(allUsers());

        if (error) {
			alert.error(error);
			dispatch(clearError());
		}
  

    }, [dispatch, alert, error]);

    const sortByEmployee = () => {
        dispatch(sortByEmployeesAssigments())
    }

    const descByEmployee = () => {
        dispatch(descByEmployeesAssigments())
    }

    return (
        <Fragment>
            <MetaData title={'Filter By Employees'} />
            <Header />
            <div className="ui clearing segment">
                <SearchDashboard />
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                    
                    <div className='ui container'>
                        <div className='mb-3'>
                            <h4 className='mb-3'>Filter By Team Members</h4>

                            {user.role === 'user' && (
                                <div className='ui right aligned container'>
                                    <h5>Sort Members</h5>
                                    <button onClick={sortByEmployee} className="btn btn-link py-1 px-1 mr-2"><i className='caret down icon'></i></button>
                                    <button onClick={descByEmployee} className="btn btn-link py-1 px-1"><i className='caret up icon'></i></button>
                                </div>
                            )}
                            
                            <div className='ui center aligned container'>
                                    <h5 className='mt-3'>Choose Assignment Team Member</h5>
                                    <select
                                        name='employee'
                                        value={employee}
                                        onChange={e => setEmployee(e.target.value)}
                                    >
                                        <option disabled>Choose Team Member</option>
                                        {users.map(user => (
                                            <>
                                                
                                                {user.role==="user" && (
                                                    <option key={user._id} value={user.fullName}>{user.fullName}</option>
                                                )}
                                                
                                            </>
                                            
                                        ))}
                                    </select>
                            </div>
                    
                        </div>
                    
                        <hr className='mb-3'/>
                        <div className='row f-flex'>
                            
                            {assigments.map(assignment => (
                            <>
                                {((employee === assignment.firstEmployee) || (employee === assignment.secondEmployee) || (employee === assignment.thirdEmployee)) && (
                                    <>
                                        <div className='col-12 col-lg-3 mb-3'>
                                            <div className='ui card ml-4 mr-4'>
                                                <div className='image'>
                                                    <img src="/images/task.jpg" alt="task" />
                                                </div>
                                                <div className='content'>
                                                    <Link to={`/assigment/${assignment._id}`}>{assignment.title}</Link>
                                                    <div className='description'>
                                                        
                                                        <b><u>{assignment.creatorFullName}</u></b>
                                                    </div>
                                                    <div className='description'>
                                                        {assignment.firstEmployee}<br/>
                                                        {assignment.secondEmployee}<br/>
                                                        {assignment.thirdEmployee}
                                                    </div>
                                                </div>
                                                <div className='extra content'>
                                                        <b>Start: </b> 
                                                        <b> {dateFormat(assignment.startingAt, "dd.mm.yyyy, HH:MM ")}h</b><br/>
                                                        <b>Finish: </b>
                                                        <b>{dateFormat(assignment.finishingAt, "dd.mm.yyyy, HH:MM")}h </b>
                                                </div>
                                                <div className='extra content'>
                                                        Priority {assignment.priority} 
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        ))}
                        </div>
                    </div>
                    </Fragment>
                    
                )}
            </div>
        </Fragment>
    )
}

export default FilterEmployees
