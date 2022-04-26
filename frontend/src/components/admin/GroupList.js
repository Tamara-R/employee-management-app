import React, { Fragment, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import { getAllGroups, clearError, deleteGroup} from '../../redux/actions/groupActions';
import { DELETE_GROUP_RESET } from '../../constants/groupConstants';

import MetaData from '../layout/MetaData';
import Header from '../layout/Header';
import Loader from '../layout/Loader';

const GroupList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { groups, error, loading } = useSelector(state => state.allGroups);
	const { isDeleted } = useSelector(state => state.groups);
	

    useEffect(() => {

		dispatch(getAllGroups());

        if (error) {
			alert.error(error);
			dispatch(clearError());
		}

        if (isDeleted) {
			alert.success('Group deleted successfully');
			history.push('/groups');
			dispatch({ type: DELETE_GROUP_RESET });
		}
        

    }, [dispatch, alert, error, isDeleted, history]);

	const deleteGroupHandler = id => {
		dispatch(deleteGroup(id));
	};

    const setGroups = () => {
		const data = {
			columns: [
				{
					label: 'Group ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Group Name',
					field: 'name',
					sort: 'asc',
				},
                {
                    label: 'Group Status',
					field: 'status',
					sort: 'asc',
                },
                {
                    label: 'Field',
					field: 'field',
					sort: 'asc',
                },
				{
                    label: 'Description',
					field: 'description',
					sort: 'asc',
                },
                {
                    label: 'Creator',
					field: 'leader',
					sort: 'asc',
                },
				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: [],
		};

		groups.forEach(group => {
			data.rows.push({
				id: group._id,
                name: group.name,
                field: group.field,
				description: group.description,
                status: group.status,
                leader: group.fullName,

				actions: (
					<Fragment>
						<Link
							to={`/group/${group._id}`}
							className='btn btn-primary py-1 px-1'
						>
							<i className='fa fa-pencil'></i>
						</Link>
						<button
							className='btn btn-danger py-1 px-1 ml-1'
							onClick={() => deleteGroupHandler(group._id)}
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
            <MetaData title={'Groups'} />
            <Header />
            <Link to='/group' className='px-1'><i className="fa fa-plus"></i> Create New Group</Link>
            <div className="ui clearing segment">
            
						{loading ? (
							<Loader />
						) : (
							<MDBDataTable
								data={setGroups()}
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

export default GroupList
