import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";
import DatePicker from 'react-datepicker';

import MetaData from '../layout/MetaData';
import Header from '../layout/Header';
import Loader from '../layout/Loader';
import SearchDashboard from '../layout/SearchDashboard';

import { getAllAssigments,  clearError, sortByFinishDateAssigments, descByEndDateAssigments } from '../../redux/actions/assignmentActions';

const FilterEndDate = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const [ startingAt, setStartingAt ] = useState(new Date());
    const [ finishingAt, setFinishingAt ] = useState(new Date());

    const { assigments, error, loading } = useSelector(state => state.allAssignments);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {

		dispatch(getAllAssigments());

        if (error) {
			alert.error(error);
			dispatch(clearError());
		}
  

    }, [dispatch, alert, error]);

    const sortByDate = () => {
        dispatch(sortByFinishDateAssigments())
    }

    const descByDate = () => {
        dispatch(descByEndDateAssigments())
    }

    return (
        <Fragment>
            <MetaData title={'Filter By End date'} />
            <Header />
            <div className="ui clearing segment">
                <SearchDashboard />
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                    
                    <div className='ui container'>
                        <div className='mb-3'>
                            <h4 className='mb-3'>Filter By End Date</h4>
                            {user.role === 'user' && (
                                <div className='ui right aligned container'>
                                    <h5>Sort End Dates</h5>
                                    <button onClick={sortByDate} className="btn btn-link py-1 px-1 mr-2"><i className='caret down icon'></i></button>
                                    <button onClick={descByDate} className="btn btn-link py-1 px-1 mr-2"><i className='caret up icon'></i></button>
                                </div>
                            )}
                            <div className='ui center aligned container'>
                                <h5 className='mt-2 mb-4'>Choose From - To Dates </h5>
                            </div>
                            <div className='ui form'>    
                                <div className='two fields'>
                                    <div className='field'>
                                        <label>From:</label>
                                        <DatePicker
                                            selected={new Date(startingAt)}
                                            onChange={(date) => setStartingAt(date)}
                                            timeInputLabel="Time:"
                                            dateFormat="dd/MM/yyyy"
                                            
                                        />
                                    </div>
                                    <div className='field'>
                                        <label>To:</label>
                                        <DatePicker
                                            selected={new Date(finishingAt)}
                                            onChange={(date) => setFinishingAt(date)}
                                            timeInputLabel="Time:"
                                            dateFormat="dd/MM/yyyy"
                                            minDate={startingAt}
                
                                        />
                                    </div>
                                </div>
                            </div>
                                    
                            
                    
                        </div>
                    
                        <hr className='mb-3'/>
                        <div className='row f-flex'>
                            
                            {assigments.map(assignment => (
                            <>
                            
                                {  (new Date(startingAt) <= new Date(assignment.finishingAt)) && (new Date(finishingAt) >= new Date(assignment.finishingAt)) && (
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

export default FilterEndDate
