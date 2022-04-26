import React, { Fragment, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";


import MetaData from '../layout/MetaData';
import Header from '../layout/Header';
import Loader from '../layout/Loader';

import { getAllAssigments, clearError } from '../../redux/actions/assignmentActions';

import { allUsers } from '../../redux/actions/authActions';

const MyAssignments = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { assigments, error, loading } = useSelector(state => state.allAssignments);
    
    const { user }  = useSelector(state => state.auth);
    
    useEffect(() => {

        if (error) {
			alert.error(error);
			dispatch(clearError());
		}

		dispatch(getAllAssigments());
       
        
        dispatch(allUsers());

    }, [dispatch, alert, error ]);

    
    return (
            <Fragment>
                
                <Header />
               
                <div className="ui clearing segment">
                    
                    {loading ? <Loader /> : (
                    <Fragment>
                        <MetaData title={`${user.fullName} Assignments`} />
    
                        <section id="assigments" className="container mt-5">
                            
                        <Fragment>
                                    <div className='ui container'>
                                        <Link className="ui right aligned container" to='/filter-leaders'><i className="search icon"></i> Search and Filter All Assignments <i className='sliders horizontal icon'></i></Link>
                                        <h4 className='ui center aligned container'>- {user.fullName} Assignments -</h4>
                                        
                                        <hr className='mb-5'/>
                                        
                                        <div className='ui grid'>
                                        
                                                {assigments.map(assignment => (
                                                    
                                                    <>
                                                        {((user.fullName === assignment.firstEmployee) || (user.fullName === assignment.secondEmployee) || (user.fullName === assignment.thirdEmployee)) && (
                                                            <>
                                                               
                                                               <div className='col-12 col-lg-3'>
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
                            
                        </section>
    
                                
                    </Fragment>
                )}      
                     
                </div>
            </Fragment>
    )
}

export default MyAssignments
