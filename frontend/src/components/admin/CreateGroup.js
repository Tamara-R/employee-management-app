import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import Header from '../layout/Header';
import MetaData from '../layout/MetaData';

import { createGroup, clearError } from '../../redux/actions/groupActions';
import { CREATE_GROUP_RESET } from '../../constants/groupConstants';

const CreateGroup = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    
    const { error, success } = useSelector(state => state.newGroup);

    const [ name, setName ] = useState('');
    const [ field, setField ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ emptyError, setEmptyError ] = useState('');
    
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (success) {
            history.push('/groups');
            alert.success('Group has been created!');

            dispatch({type: CREATE_GROUP_RESET});
        }
    }, [dispatch, history, alert, error, success]);

    
    const handleSubmit = e => {

        e.preventDefault();
        // const formData = new FormData();
        // formData.set('name', name);
        // formData.set('field', field);
        // formData.set('description', description)

        if( name.trim() === '' ) {
            setEmptyError('Required field!');
            
        }
        
        dispatch(createGroup({name, field, description}));
    }



    return (
        <Fragment>
            <MetaData title={`Create Group`} />
            <Header />
            <div className='ui clearing segment'>
                <form onSubmit={handleSubmit} className='ui form' autoComplete='off'>
                    <h4 className="ui dividing header">Create New Group</h4>
                    <div className="field">
                        <label>Group Name</label>
                        <input 
                            type="text"
                                name="name" 
                                placeholder="Group name" 
                                value={name}
                                onChange={e => setName(e.target.value)}
                        />
                        <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
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
                    <button className="ui right floated button" type="submit">Create Group</button>
                </form>
            </div>
            
        </Fragment>
    )
}

export default CreateGroup
