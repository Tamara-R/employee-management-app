import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import dateFormat from "dateformat";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MetaData from '../layout/MetaData';
import Header from '../layout/Header';

import { getAssignmentDetails, clearError, updateAssignment, createComment, deleteComment } from '../../redux/actions/assignmentActions';
import { getGroupDetails } from '../../redux/actions/groupActions';

import { UPDATE_ASSIGNMENT_RESET, CREATE_COMMENT_RESET, DELETE_COMMENT_RESET } from '../../constants/assignmentConstants';




const AssignmentDetail = ({match, history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [ status, setStatus ] = useState('');
    const [ commentBody, setCommentBody ] = useState('');

    const { group } = useSelector(state => state.groupDetails);
    const { assigment, error } = useSelector(state => state.assignmentDetails);
    const { user }  = useSelector(state => state.auth);
    const { isUpdated } = useSelector(state => state.assignments);
    const { success } = useSelector(state => state.newComment);
    const { isDeleted, error: deleteError } = useSelector(state => state.deleteComment);
    
    
    const assigmentId = match.params.id;

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        dispatch(getAssignmentDetails(assigmentId));
        dispatch(getGroupDetails(assigment.group));

        if (success) {
            alert.success('Comment has been posted!');
            setCommentBody('');
            dispatch({type: CREATE_COMMENT_RESET});
        }

        if (isUpdated) {
			alert.success('Assignment updated successfully');

			history.push(`/assigment/${assigmentId}`);

			dispatch({type: UPDATE_ASSIGNMENT_RESET});
		}

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearError());
        }
    
    
        if (isDeleted) {
            alert.success('Comment deleted successfully');
            dispatch({ type: DELETE_COMMENT_RESET });
        }

    }, [dispatch, error, assigmentId, isUpdated, success, deleteError, isDeleted, assigmentId, assigment.group])

    const updateHandler = e => {
        e.preventDefault();
        
        dispatch(updateAssignment(match.params.id, { status }));
    }

    // console.log(assigment.group)
    const date1 = new Date(assigment.startingAt);
    const date2 = new Date(assigment.finishingAt);   
    const deadline = (Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24)));

    
    const onSubmit = e => {
        e.preventDefault();
        
        dispatch(createComment({commentBody, assigmentId}));
    }

    const deleteHandler = id => {
        dispatch(deleteComment(id, assigmentId));
        
    };


    return (
        <Fragment>
            <MetaData title={assigment.title} />
            <Header />
            <div className='ui segment'>
                <h4>Assignment Details </h4>
                
                <div className="ui grid">
                    <div className='six wide column'>
                        <div className="ui clearing segment">
                            <div className='ui container'>
                                <h4>Assignment ID</h4>
                                <p>{assigment._id}</p>
                                <hr />
                                <h4>Title</h4>
                                <p>{assigment.title}</p>
                                <hr />
                                <h4>Assignment Description</h4>
                                <p>{assigment.description}</p>
                                <hr />
                                <h4>Leader</h4>
                                <p>{assigment.creatorFullName}</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className='five wide column'>
                        <div className="ui clearing segment">
                            <div className='ui container'>
                                
                                <h4>Assignment Priority</h4>
                                <p>{assigment.priority}</p>
                                <hr />
                                <h4>Assignment Status</h4>
                                <p>{assigment.status}</p>
                                
                                {(((user.fullName === assigment.firstEmployee) || (user.fullName === assigment.secondEmployee) 
                                || (user.fullName === assigment.thirdEmployee))) && (assigment.status === 'In progress') && (
                                    <div className="ui right aligned container">
                                    <button type="button" className="btn btn-link px-2 ml-4" data-toggle="modal" data-target="#exampleModalCenter">
                                        Update Status
                                    </button>
                                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLongTitle">Update Assignment Status</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                            <div class="modal-body">
                                                <div className="ui center aligned container">    
                                                    <select
                                                        name='status'
                                                        value={status}
                                                        onChange={e => setStatus(e.target.value)}
                                                        >
                                                            <option value='In progress'>In progress</option>
                                                            <option value='Finished'>Finished</option>
                                                    </select>  
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-primary" onClick={updateHandler} data-dismiss="modal">Update</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    // <form onSubmit={updateHandler} className='ui form'>
                                        
                                    //     <hr/>
                                    //     <h5>Update Status</h5>
                                    //     <div className='two fields'>
                                    //             <div className='ui field'>
                                    //             <select
                                    //                 name='status'
                                    //                 value={status}
                                    //                 onChange={e => setStatus(e.target.value)}
                                    //                 >
                                    //                     <option value='In progress'>In progress</option>
                                    //                     <option value='Finished'>Finished</option>
                                    //                 </select>
                                    //             </div>
                                    //             <div className='ui field'>
                                    //                 <button type="submit" className='btn btn-link py-1 px-1 ml-2 mt-1'>Update</button>
                                    //             </div>
                                    //     </div>
                                    // </form>
                                
                                )}
                                <hr/>
                                <h4>Belongs to Group</h4>
                                <p>{group.name}</p>
                                <hr/>
                                <h4>Deadline</h4>
                                <p>{deadline} days</p>
                            </div>
                        </div>
                    </div>
                    <div className="five wide column">
                        <div className="ui clearing segment">
                            <div className='ui container'>
                                <h4>Starting at</h4>
                                <p>{dateFormat(assigment.startingAt, "dddd, mmmm dS, yyyy, HH:MM")}</p>
                                <hr/>
                                <h4>Finishing at</h4>
                                <p>{dateFormat(assigment.finishingAt, "dddd, mmmm dS, yyyy, HH:MM")}</p>
                                <hr/>
                                <h4>Assignment Empolyees</h4>
                                <div className='ui list'>
                                    <div className='ui item'>{assigment.firstEmployee}</div>
                                    <div className='ui item'>{assigment.secondEmployee}</div>
                                    <div className='ui item'>{assigment.thirdEmployee}</div>
                                </div>
                                <hr/>
                                <button type="button" className="btn btn-link py-1 px-1 ml-2 mt-1" data-toggle="modal" data-target=".bd-example-modal-lg">
                                    View Documentation
                                </button>
                                <div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className='ExternalFiles'>
                                                <iframe src='/uploads/plan.pdf' style={{width: '100%', height: '400px'}}></iframe>
                                                </div>
                                            
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>               
                    </div>
                </div>
               {/* <a href={assigment.file?.url} target='_blank'>View Document</a> */}
               
            </div>
            <div className='ui clearing segment'>
                {((user.fullName === assigment.firstEmployee) || (user.fullName === assigment.secondEmployee) || (user.fullName === assigment.thirdEmployee)) && (
                        <div className='mt-3 ml-3'>
                        
                            <form className='ui form' onSubmit={onSubmit}>
                                <div className='two fields'>
                                <input
                                    placeholder='Leave a comment'
                                    className='ui field'
                                    value={commentBody}
                                    onChange={e => setCommentBody(e.target.value)}
                                />
                                <button className="ui right floated button" type="submit">Comment</button>
                                </div> 
                            </form>
                            
                        </div>
                )}

                
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                    >
                        <h3>Comments</h3>
                        <hr/>
                    </AccordionSummary>
                    
                        {assigment.comments && assigment.comments.map(comment => (
                            <div className='ui container'>
                                <div className='d-flex justify-content-between'>
                                <h4 className='ui left aligned container'><u>{comment.fullName}</u></h4>
                                <p >{dateFormat(comment.createdAt, "dS mmmm, yyyy, HH:MM ")}h</p>
                                </div>
                                <p className='ui left aligned container'>{comment.commentBody}</p>
                                {user.role !== 'user' && (
                                
                                    <div className='d-flex justify-content-end'>
                                        <button
                                            className='btn btn-danger ml-2'
                                            onClick={() => deleteHandler(comment._id)}
                                        >
                                            <i className='fa fa-trash'></i>
                                        </button>
                                    </div>
                               
                                )}
                                <hr/>
                            </div>    
                        ))}                     
                    
                </Accordion>          
            </div>
        </Fragment>
    )
}

export default AssignmentDetail;