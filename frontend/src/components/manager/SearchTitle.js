import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory, Link } from 'react-router-dom';
import dateFormat from "dateformat";
import Pagination from 'react-js-pagination';

import MetaData from '../layout/MetaData';
import Header from '../layout/Header';
import Loader from '../layout/Loader';
import Search from './Searh';
import SearchDashboard from '../layout/SearchDashboard';

import { searchAllAssigments, clearError } from '../../redux/actions/assignmentActions';

import { allUsers } from '../../redux/actions/authActions';



const SearchTitle = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ currentPage, setCurrentPage ] = useState(1);
   
    const keyword = match.params.keyword;

    const { assigments, error, loading, resPerPage, assigmentCount } = useSelector(state => state.allAssignments);
    
    
    const { users } = useSelector(state => state.allUsers);
    
    
    useEffect(() => {

        if (error) {
			alert.error(error);
			dispatch(clearError());
		}

		dispatch(searchAllAssigments(keyword, currentPage));
       
        
        dispatch(allUsers());

    }, [dispatch, alert, error, keyword, currentPage]);

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    
   
    return (
        <Fragment>
            
            <Header />
           
            <div className="ui clearing segment">
                <SearchDashboard />
                <div className='mt-5'>
                    <Search history={history}/>
                </div>
                {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Search by Title'} />

                    <section id="assigments" className="container mt-5">
                        { keyword ? (
                            <Fragment>
                                
                                <div className='ui container'>
                                
                                    <div className='row f-flex'>
                                                         
                                        {assigments.map(assignment => (
                                            <>
                                                <div className='col-12 col-lg-3 mr-5 ml-5 mb-2'>
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
                        ): (
                            <Fragment>
                                <div className='ui container'>
                                
                                    <div className='row f-flex'>
                                                         
                                            {assigments.map(assignment => (
                                                <>
                                                    <div className='col-12 col-lg-3 mr-5 ml-5'>
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
                        )}
                    </section>

                    
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

export default SearchTitle;