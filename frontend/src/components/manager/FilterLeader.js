import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";
import Pagination from 'react-js-pagination';

import MetaData from '../layout/MetaData';
import Header from '../layout/Header';
import Loader from '../layout/Loader';
import SearchDashboard from '../layout/SearchDashboard';

import { searchAllAssigments, sortByLeaderAssigments, descByLeaderAssigments, clearError } from '../../redux/actions/assignmentActions';

import { allUsers } from '../../redux/actions/authActions';


const FilterLeader = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ creatorFullName, setCreatorFullName ] = useState('');
    
    const { assigments, error, loading, resPerPage, assigmentCount } = useSelector(state => state.allAssignments);
    const { users } = useSelector(state => state.allUsers);
    const { user } = useSelector(state => state.auth);
    const keyword = match.params.keyword;

    useEffect(() => {

        if (error) {
			alert.error(error);
			dispatch(clearError());
		}

		dispatch(searchAllAssigments( keyword, currentPage, creatorFullName));
        dispatch(allUsers());

    }, [dispatch, alert, error, currentPage, creatorFullName, keyword]);

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const sortByLeader = () => {
        dispatch(sortByLeaderAssigments( keyword, currentPage ))
    }

    const descByLeader = () => {
        dispatch(descByLeaderAssigments( keyword, currentPage ))
    }

    
    return (
        <Fragment>
            <Header />
           
            <div className="ui clearing segment">
                <SearchDashboard />
                {loading ? <Loader /> : (
                    <Fragment>
                        <MetaData title={'Filter by Team Lead'} />                          
                            <Fragment>
                                <div className='ui container'> 
                                    <h4 className='mb-3'>Filter By Team Lead</h4>
                                    
                                    {user.role === 'user' && (

                                        <div className='ui right aligned container'>
                                            <h5>Sort Leaders</h5>
                                            <button onClick={sortByLeader} className="btn btn-link py-1 px-1 mr-2"><i className='caret down icon'></i></button>
                                            <button onClick={descByLeader} className="btn btn-link py-1 px-1 "><i className='caret up icon'></i></button>
                                        </div>
                                    )}
                                
                                    <div className='ui center aligned container'>
                                        <h5 className='mt-3'>Choose Assignment Team Lead </h5>
                                            <select
                                                name='status'
                                                value={creatorFullName}
                                                onChange={e => setCreatorFullName(e.target.value)}
                                                >
                                                    <option disabled>Choose Team Leader</option>
                                                    {users.map(user => (
                                                        <>
                                                            
                                                            {user.role!=="user" && (
                                                                <option key={user._id} value={user.fullName}>{user.fullName}</option>
                                                            )}
                                                        </>
                                                        
                                                    ))}
                                            </select>
                                    </div>
                                    <hr className='mb-3'/>
                                    <div className='row f-flex'>
                                                            
                                        {assigments.map(assignment => (
                                            <>
                                                <div className='col-12 col-lg-3 mr-5 ml-5 mb-1'>
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
                                        ))}                     
                                        
                                    </div>
                                </div>  
                            </Fragment>  
                        
                        {
                            resPerPage < assigmentCount && (
                                <div className='d-flex justify-content-center mt-5'>
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resPerPage}
                                        totalItemsCount={assigmentCount}
                                        prevPageText='<'
                                        nextPageText='>'
                                        firstPageText='<<'
                                        lastPageText='>>'
                                        itemClass='page-item'
                                        linkClass='page-link'
                                        onChange={handlePagination}
                                    />
                                </div>
                            )
                        }
                        
                    </Fragment>
                )}
                 
        </div>
    </Fragment>

)}

export default FilterLeader;