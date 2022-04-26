import React, { Fragment, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, useHistory } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import dateFormat from "dateformat";

import MetaData from '../layout/MetaData';
import Header from '../layout/Header';
import Loader from '../layout/Loader';

import { getAllAssigments, deleteAssigments, clearError } from '../../redux/actions/assignmentActions';
import { DELETE_ASSIGNMENT_RESET } from '../../constants/assignmentConstants';


const AssignmentList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const { assigments, error, loading } = useSelector(state => state.allAssignments);
    const { isDeleted } = useSelector(state => state.assignments);
    const { user }  = useSelector(state => state.auth);
    

    useEffect(() => {

		dispatch(getAllAssigments());

        if (error) {
			alert.error(error);
			dispatch(clearError());
		}

        if (isDeleted) {
			alert.success('Assignment deleted successfully');
			history.push('/assignments');
			dispatch({ type: DELETE_ASSIGNMENT_RESET });
		}
        

    }, [dispatch, alert, error, isDeleted, history]);

	const deleteAssignmentHandler = id => {
		dispatch(deleteAssigments(id));
	};

    const setAssignments = () => {
		const data = {
			columns: [
				{
					label: 'Title',
					field: 'title',
					sort: 'asc',
				},
                {
                    label: 'Leader',
					field: 'creatorFullName',
					sort: 'asc',
                },
                {
                    label: 'Priority',
					field: 'priority',
					sort: 'asc',
                },
                {
                    label: 'Status',
					field: 'status',
					sort: 'asc',
                },
                {
                    label: 'Team Members',
					field: 'employees',
					sort: 'asc',
                },
               
                {
                    label: 'Start',
					field: 'dateStart',
					sort: 'asc',
                },
                {
                    label: 'Finish',
					field: 'dateFinish',
					sort: 'asc',
                },
				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: [],
		};
    
    
        assigments.forEach(assigment => {
            data.rows.push({
                title: assigment.title,
                creatorFullName: assigment.creatorFullName,
                priority: assigment.priority,
                status: assigment.status,
                // employees: assigment.firstEmployee,
                employees: (
                    <Fragment>
                        <div className='ui item'>{assigment.firstEmployee}</div>
                        <div className='ui item'>{assigment.secondEmployee}</div>
                    </Fragment>
                )
                ,
                    // (
                //     <>
                        
                //         <div className='ui item'>{assigment.firstEmployee}</div>
                //         <div className='ui item'>{assigment.secondEmployee}</div>
                //         <div className='ui item'>{assigment.thirdEmployee}</div>
                        
                //      </>
                // ),
                dateStart: dateFormat(assigment.startingAt, "dd.mm.yyyy."),
                dateFinish: dateFormat(assigment.finishingAt, "dd.mm.yyyy."),
                actions: (
                    <Fragment>
                        <Link
                            to={`/assigment/${assigment._id}`}
                            className='btn btn-info py-1 px-1 mr-2'
                        >
                            <i className='fa fa-eye'></i>
                        </Link>
                        <Link
                            to={`/update-assigment/${assigment._id}`}
                            className='btn btn-primary py-1 px-1'
                        >
                            <i className='fa fa-pencil'></i>
                        </Link>
                        
                        <button
                            className='btn btn-danger py-1 px-1 ml-2'
                            onClick={() => deleteAssignmentHandler(assigment._id)}
                        >
                            <i className='fa fa-trash'></i>
                        </button>
                    </Fragment>
                ),
            });
        });

        return data;
    };


    return (
        <Fragment>
            <MetaData title={'Assignments'} />
            <Header />
            <div className='ui grid'>
                <Link to='/assignment' className='ui left floated four wide column'><i className="fa fa-plus"></i> Create New Assigment</Link>
                {user && user.role === 'manager' && (
                    <Link className="ui right floated four wide column" to='/filter-title'><i className="search icon"></i> Search and Filter Assignments <i className='sliders horizontal icon'></i></Link>
                )}
            </div>   
            
            <div className="ui clearing segment">
            
						{loading ? (
							<Loader />
						) : (
							<MDBDataTable
								data={setAssignments()}
								className='px-2 ml-1'
								bordered
								striped
								hover
							/>
						)}
            </div>
                            
        </Fragment>
    )
}

export default AssignmentList;
