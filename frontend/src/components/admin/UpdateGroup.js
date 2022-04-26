import React, { Fragment, useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../layout/Header';
import MetaData from '../layout/MetaData';

import { updateGroup, getGroupDetails, clearError } from '../../redux/actions/groupActions';
import { UPDATE_GROUP_RESET } from '../../constants/groupConstants';

const UpdateGroup = ({ match, history }) => {

    const alert = useAlert();
	const dispatch = useDispatch()

    const [ name, setName ] = useState('');
    const [ field, setField ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ status, setStatus ] = useState('');

    const { error, isUpdated } = useSelector(state => state.groups);
	const { group } = useSelector(state => state.groupDetails);

    const groupId = match.params.id;


    useEffect(() => {

		if (group && group._id !== groupId) {
			dispatch(getGroupDetails(groupId));
		} 
        else {
			setName(group.name);
			setField(group.field);
			setDescription(group.description);
			setStatus(group.status)
        }
		if (error) {
			alert.error(error);
			dispatch(clearError());
		}

		if (isUpdated) {
			alert.success('Group updated successfully');

			history.push('/groups');

			dispatch({type: UPDATE_GROUP_RESET});
		}
	}, [dispatch, alert, error, history, isUpdated, groupId, group]);

    const updateHandler = e => {
        e.preventDefault();
        
        dispatch(updateGroup(match.params.id, {name, field, description, status }));
    }
    return (
        <Fragment>
            <MetaData title={`Update ${group.name}`} />
			<Header />
            <div className='ui clearing segment'>
                <form onSubmit={updateHandler} className='ui form' autoComplete='off'>
                    <h4 className="ui dividing header">Update Group</h4>
                    <div className="field">
                        <label>Group Name</label>
                        <input 
                            type="text"
                                name="name" 
                                placeholder="Group name" 
                                value={name}
                                onChange={e => setName(e.target.value)}
                        />
					</div>
                    <div className="field">
                        <label>Group Field</label>
                        <input 
                            type="text"
                                name="field" 
                                placeholder="Group Field" 
                                value={field}
                                onChange={e => setField(e.target.value)}
                        />
					</div>
                    <div className="field">
                        <label>Group Description</label>
                        <input 
                            type="text"
                                name="description" 
                                placeholder="Group Description" 
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                        />
					</div>
                    <div className="field">
                        <label>Group Status</label>
                        <select
                            name='status'
                            value={status}
                            onChange={e => setStatus(e.target.value)}
							>
								<option value='Active'>Active</option>
                                <option value='Inactive'>Inactive</option>
								<option value='Closed'>Closed</option>
							</select>
					</div>
                    <button className="ui right floated button" type="submit">Update Group</button>
                </form>
            </div>
        </Fragment>
    )
}

export default UpdateGroup
