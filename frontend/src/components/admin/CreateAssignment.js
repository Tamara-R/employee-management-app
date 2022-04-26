import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import Header from '../layout/Header';
import MetaData from '../layout/MetaData';

import { createAssignment, clearError } from '../../redux/actions/assignmentActions';
import { CREATE_ASSIGNMENT_RESET } from '../../constants/assignmentConstants';
import { getAllGroups } from '../../redux/actions/groupActions';
import { allUsers } from '../../redux/actions/authActions';


const CreateAssignment = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const { error, success } = useSelector(state => state.newAssignment);
    const { users } = useSelector(state => state.allUsers);
    const { groups } = useSelector(state => state.allGroups);

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ priority, setPriority ] = useState(1);
    const [ group, setGroup ] = useState('');
    const [ firstEmployee, setFirstEmployee ] = useState('');
    const [ secondEmployee, setSecondEmployee ] = useState('');
    const [ thirdEmployee, setThirdEmployee ] = useState('');
    const [ startingAt, setStartingAt ] = useState(new Date());
    const [ finishingAt, setFinishingAt ] = useState(new Date());
    const [ file, setFile ] = useState('');
    const [ show, setShow ] = useState(false);
    const [ showSecond, setShowSecond ] = useState(false);
    const [ emptyError, setEmptyError ] = useState('');
    

    const onClickShow = () => setShow(true);
    const onClickShowSecond = () => setShowSecond(true);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (success) {

            history.push('/assignments');
            alert.success('Assignment has been created!');

            dispatch({type: CREATE_ASSIGNMENT_RESET});
        }

        dispatch(getAllGroups());
        dispatch(allUsers());

    }, [dispatch, history, alert, error, success]);
    
    
    const onChange = e => {
        const reader = new FileReader();
        reader.onload = () => {
        if (reader.readyState === 2) {
            setFile(reader.result);
        }
        }
        reader.readAsDataURL(e.target.files[0]);
    }


    const onSubmit = e => {

        e.preventDefault();

        if( title.trim() === '' || description.trim() === '' || group.trim() === '' || 
            firstEmployee.trim() === '' || file.trim() === '' || priority.trim() === '') {
            setEmptyError('Required field!');  
        }
        
        
        dispatch(createAssignment({
            title, description, priority, group, 
            firstEmployee, secondEmployee, thirdEmployee, 
            startingAt, finishingAt, file
        }));
    }

    return (
        <Fragment>
        <MetaData title={`Create Assignment`} />
        <Header />
        <div className='ui clearing segment'>
            <h4 className="ui dividing header">Create New Assignment</h4>
            <form onSubmit={onSubmit} className='ui form' autoComplete='off'>
                <div className='two fields'>
                    <div className="field">
                        <label>Assignment Title</label>
                        <input 
                            type="text"
                                name="title" 
                                placeholder="Assignment Title" 
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                        />
                        <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
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
                        <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                    </div>
                </div>
                <div className='two fields'>
                    <div className="field">
                        <label>Assignment Priority</label>
                        <select
                            name='priority'
                            value={priority}
                            onChange={e => setPriority(e.target.value)}
                            >   
                                <option key={0} disabled defaultChecked>Choose Priority</option>
                                <option key={1} value='1'>1</option>
                                <option key={2} value='2'>2</option>
                                <option key={3} value='3'>3</option>
                                <option key={4} value='4'>4</option>
                                <option key={5} value='5'>5</option>
                                <option key={6} value='6'>6</option>
                                <option key={7} value='7'>7</option>
                                <option key={8} value='8'>8</option>
                                <option key={9} value='9'>9</option>
                                <option key={10} value='10'>10</option>
                        </select>
                        <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                    </div>
                    
                    <div className="field">
                        <label>Assignment Group</label>
                        <select
                            name='group'
                            value={group}
                            onChange={e => setGroup(e.target.value)}
                        >
                            <option disabled defaultChecked>Choose Group</option>
                            {groups.map(group => (
                                
                                <option key={group._id} value={group._id}>{group.name}</option>
                                
                            ))}
                        </select>
                        <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                    </div>

                    
                </div>
                <div className='two fields'>
                    <div className="field">
                        <label>Assignment Team Member</label>
                        <select
                            name='firstEmployee'
                            value={firstEmployee}
                            onChange={e => setFirstEmployee(e.target.value)}
                            >
                                <option disabled defaultChecked>Choose Employee</option>
                                {users.map(user => (
                                    <>
                                        
                                        {user.role==="user" && (
                                            <option key={user._id} value={user.fullName}>{user.fullName}</option>
                                        )}
                                    </>
                                    
                                ))}
                        </select>
                        <Link to='#' onClick={onClickShow}><i className="fa fa-plus"></i> Add Team Member</Link>
                        <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                    </div>
                    <div className='two fields'>
                        
                        { show ? (
                            <>
                            <div className="field">
                                <label>Assignment Team Member</label>
                                <select
                                    name='secondEmployee'
                                    value={secondEmployee}
                                    onChange={e => setSecondEmployee(e.target.value)}
                                    >
                                        <option disabled defaultChecked>Choose Employee</option>
                                        {users.map(user => (
                                            <>
                                                
                                                {user.role==="user" && (
                                                    <option key={user._id} value={user.fullName}>{user.fullName}</option>
                                                )}
                                            </>
                                            
                                        ))}
                                </select>
                                <Link  to='#' onClick={onClickShowSecond}> <i className="fa fa-plus"></i> Add Last Team Member</Link>
                            </div>
                            <div className='field'>
                                
                                { showSecond ? (
                                    <>
                                    <div className="field">
                                        <label>Assignment Team Member</label>
                                        <select
                                            name='thirdEmployee'
                                            value={thirdEmployee}
                                            onChange={e => setThirdEmployee(e.target.value)}
                                            >
                                                <option disabled defaultChecked>Choose Employee</option>
                                                {users.map(user => (
                                                    <>
                                                        
                                                        {user.role==="user" && (
                                                            <option key={user._id} value={user.fullName}>{user.fullName}</option>
                                                        )}
                                                    </>
                                                    
                                                ))}
                                        </select>
                                    </div>
                                    </>
                                ) : null
                                }
                            </div>
                            </>
                        ) : null
                        }
                    </div>
                </div>
                <div className='two fields'>
                    <div className='field'>
                        <label>Start at:</label>
                        <DatePicker
                            selected={startingAt}
                            onChange={(date) => setStartingAt(date)}
                            timeInputLabel="Time:"
                            dateFormat="dd/MM/yyyy HH:mm"
                            showTimeInput
                            name='startingAt'
                        />
                    </div>
                    <div className='field'>
                        <label>Finish at:</label>
                        <DatePicker
                            selected={finishingAt}
                            onChange={(date) => setFinishingAt(date)}
                            timeInputLabel="Time:"
                            dateFormat="dd/MM/yyyy HH:mm"
                            showTimeInput
                            minDate={startingAt}
                            name='finishingAt'
                        />
                    </div>
                </div>
                
                <div className='field'>
                    <label htmlFor='avatar_upload'>Add a Document</label>
                    <div className='d-flex align-items-center mb-3'>
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='file'
                                className='custom-file-input'
                                id='customFile'
                                onChange={onChange}
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                Choose Document
                            </label>
                        </div>
                    </div>
                    <div className='mt-2' style={{ 'color' : 'red' }}>{emptyError}</div>
                </div>
                
                <button className="ui right floated button" type="submit">Create Assignment</button>
            </form>
        </div>
        
    </Fragment>
    )
}

export default CreateAssignment
