import React, { Fragment, useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';


import { updateAssignment, getAssignmentDetails,  clearError } from '../../redux/actions/assignmentActions';
import { UPDATE_ASSIGNMENT_RESET } from '../../constants/assignmentConstants';

import MetaData from '../layout/MetaData';
import Header from '../layout/Header';

const UpdateAssignment = ({ match, history }) => {

    const alert = useAlert();
	const dispatch = useDispatch()

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ priority, setPriority ] = useState('');
    const [ status, setStatus ] = useState('');
    

    const { isUpdated } = useSelector(state => state.assignments);
	const { assigment, error } = useSelector(state => state.assignmentDetails);

    const assigmentId = match.params.id;

    useEffect(() => {

        

		if (assigment && assigment._id !== assigmentId) {
			dispatch(getAssignmentDetails(assigmentId));
		} 
        else {
			setTitle(assigment.title);
			setDescription(assigment.description);
            setPriority(assigment.priority);
			setStatus(assigment.status)
            
        }
		if (error) {
			alert.error(error);
			dispatch(clearError());
		}

		if (isUpdated) {
			alert.success('Assignment updated successfully');

			history.push('/assignments');

			dispatch({type: UPDATE_ASSIGNMENT_RESET});
		}
	}, [dispatch, alert, error, history, isUpdated, assigmentId, assigment]);

   

    const updateHandler = e => {
        e.preventDefault();
        
        dispatch(updateAssignment(match.params.id, { title, description, priority, status }));
    }
    return (
        <Fragment>
            <MetaData title={`Update ${assigment.title}`} />
			<Header />
            <div className='ui clearing segment'>
                <form onSubmit={updateHandler} className='ui form' autoComplete='off'>
                    <h4 className="ui dividing header">Update Assignment</h4>
                    <div className="field">
                        <label>Assignment Title</label>
                        <input 
                            type="text"
                                name="name" 
                                placeholder="Assignment Title" 
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                        />
					</div>
                    <div className="field">
                        <label>Assignment Description</label>
                        <input 
                            type="text"
                                name="description" 
                                placeholder="Assignment Description" 
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                        />
					</div>
                    <div className="field">
                        <label>Assignment Priority</label>
                        <select
                            name='priority'
                            value={priority}
                            onChange={e => setPriority(e.target.value)}
							>
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
                    <div className="field">
                        <label>Assignment Status</label>
                        <select
                            name='status'
                            value={status}
                            onChange={e => setStatus(e.target.value)}
							>
								<option value='In progress'>In progress</option>
                                <option value='Finished'>Finished</option>
								<option value='Canceled'>Canceled</option>
							</select>
					</div>
                    <button className="ui right floated button" type="submit">Update Assignment</button>
                </form>
            </div>
        </Fragment>
    )
}

export default UpdateAssignment
