import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";

import MetaData from '../layout/MetaData';
import Header from '../layout/Header';
import Loader from '../layout/Loader';
import SearchDashboard from '../layout/SearchDashboard';

import { getAllAssigments,  clearError } from '../../redux/actions/assignmentActions';


const FilterPriority = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const [ priority, setPriority ] = useState(1);
    const { assigments, error, loading } = useSelector(state => state.allAssignments);
    
    useEffect(() => {

		dispatch(getAllAssigments());

        if (error) {
			alert.error(error);
			dispatch(clearError());
		}
  

    }, [dispatch, alert, error]);

    

    return (
        <Fragment>
            <MetaData title={'Filter By Priority'} />
            <Header />
            <div className="ui clearing segment">
                <SearchDashboard />
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                    
                    <div className='ui container'>
                        <div className='mb-3'>
                            <h4 className='mb-3'>Filter By Priority</h4>
                            <div className='ui center aligned container'>
                                    <h5>Choose Assignment Priority</h5>
                                   
                                    <select
                                        name='priority'
                                        value={priority}
                                        onChange={e => setPriority(e.target.value)}
                                        >   
                                            <option disabled>Choose Priority</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                            <option value='6'>6</option>
                                            <option value='7'>7</option>
                                            <option value='8'>8</option>
                                            <option value='9'>9</option>
                                            <option value='10'>10</option>
                                           
                                    </select>
                                    
                            </div>
                    
                        </div>
                    
                        <hr className='mb-3'/>
                        <div className='row f-flex'>
                            
                            {assigments.map(assignment => (
                            <>
                                { priority == assignment.priority && (
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

export default FilterPriority
