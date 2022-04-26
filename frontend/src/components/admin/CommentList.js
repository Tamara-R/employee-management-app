import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import dateFormat from "dateformat";

import MetaData from '../layout/MetaData';
import Header from '../layout/Header';
import Loader from '../layout/Loader';

import { getAllAssigments, deleteComment, getAssignmentDetails, getComments, clearError } from '../../redux/actions/assignmentActions';
import { DELETE_COMMENT_RESET } from '../../constants/assignmentConstants';

const CommentList = ({match}) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const { assigments, error, loading } = useSelector(state => state.allAssignments);
    const { assigment } = useSelector(state => state.assignmentDetails);
    const { isDeleted, error: deleteError } = useSelector(state => state.deleteComment);
    const { comments } = useSelector(state => state.getComments);

    const [ assigmentId, setAssigmentId ] = useState('');

    useEffect(() => {

        dispatch(getAssignmentDetails(assigment._id));
        dispatch(getAllAssigments());

        if (assigmentId !== '') {
            dispatch(getComments(assigmentId));
        }

        if (error) {
			alert.error(error);
			dispatch(clearError());
		}

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearError());
        }
    
    
        if (isDeleted) {
            alert.success('Comment deleted successfully');
            dispatch({ type: DELETE_COMMENT_RESET });
        }
        

    }, [dispatch, alert, error, deleteError, isDeleted, history, assigmentId]);

    const deleteHandler = id => {
        dispatch(deleteComment(id, assigmentId));
        
    };

    const submitHandler = e => {
        e.preventDefault();
        dispatch(getComments(assigmentId));
    };

    const setAssignments = () => {
		const data = {
			columns: [
				{
					label: 'Comment ID',
					field: 'id',
					sort: 'asc',
				},
                {
                    label: 'Comment Creator',
					field: 'fullName',
					sort: 'asc',
                },
                {
                    label: 'Comment Body',
					field: 'commentBody',
					sort: 'asc',
                },
                {
                    label: 'Comment Date',
					field: 'createdAt',
					sort: 'asc',
                },
				{
					label: 'Delete',
					field: 'delete',
				},
			],
			rows: [],
		};
    

        comments && comments.forEach(comment => {
            data.rows.push({
                id: comment._id,
                fullName: comment.fullName,
                commentBody: comment.commentBody,
                createdAt: dateFormat(comment.createdAt, "dS mmmm, yyyy, HH:MM "),
                delete: (
                    <Fragment>
                        <button
                            className='btn btn-danger py-1 ml-5'
                            onClick={() => deleteHandler(comment._id)}
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
            <MetaData title={'Comments'} />
            <Header />
            
            <div className="ui clearing segment">
                <div className='ui center aligned container'>
                    <h5>Choose an Assignment</h5>
                    <form className='ui field' onChange={submitHandler}>
                        <select
                            name='assigmentId'
                            value={assigmentId}
                            onChange={e => setAssigmentId(e.target.value)}
                        >
                            {assigments.map(assignment => (
                                <option key={assignment._id} value={assignment._id}>{assignment.title}</option>
                            
                            ))}
                        </select>
                    </form>
                </div>
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

export default CommentList
