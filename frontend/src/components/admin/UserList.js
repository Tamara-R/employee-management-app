import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../layout/Loader';
import Header from '../layout/Header';
import MetaData from '../layout/MetaData';

import { allUsers, clearError, deleteUser} from '../../redux/actions/authActions';
import { DELETE_USER_RESET } from '../../constants/authConstants';

export default function UsersList({ history }) {
	
	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, error, users } = useSelector(state => state.allUsers);
	const { isDeleted } = useSelector(state => state.adminUser);
	
	useEffect(() => {

		dispatch(allUsers());

		if (error) {
			alert.error(error);
			dispatch(clearError());
		}

		if (isDeleted) {
			alert.success('User deleted successfully');
			history.push('/admin/users');
			dispatch({ type: DELETE_USER_RESET });
		}

	}, [dispatch, alert, error, isDeleted, history]);

	const deleteUserHandler = id => {
		dispatch(deleteUser(id));
	};

	const setUsers = () => {
		const data = {
			columns: [
				{
					label: 'User ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Full name',
					field: 'fullName',
					sort: 'asc',
				},
                {
					label: 'Username',
					field: 'username',
					sort: 'asc',
				},
				{
					label: 'Email',
					field: 'email',
					sort: 'asc',
				},
                {
					label: 'Phone No.',
					field: 'phoneNo',
					sort: 'asc',
				},
                {
					label: 'Status',
					field: 'status',
					sort: 'asc',
				},
				{
					label: 'Role',
					field: 'role',
					sort: 'asc',
				},
				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: [],
		};

		users.forEach(user => {
			data.rows.push({
				id: (<Link to={`/user/${user._id}`}>{user._id}</Link>),
                fullName: user.fullName,
				username: user.username,
				email: user.email,
                phoneNo: user.phoneNo,
                status: user.status,
				role: user.role,

				actions: (
					<Fragment>
						<Link
                            to={`/user/${user._id}`}
                            className='btn btn-info py-1 px-1'
                        >
                            <i className='fa fa-eye'></i>
                        </Link>
						<Link
							to={`/admin/user/${user._id}`}
							className='btn btn-primary py-1 px-1 ml-1'
						>
							<i className='fa fa-pencil'></i>
						</Link>
						<button
							className= 'btn btn-danger py-1 px-1 ml-1'
							onClick={() => deleteUserHandler(user._id)}
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
			<MetaData title={'Users'} />
			<Header />
			
			<Link to='/admin/create' className='px-1'><i className="fa fa-plus"></i> Create New User</Link>
			
			<div className='ui clearing segment'>
				<div className='row ml-2'>
					<Fragment>
						{loading ? (
							<Loader />
						) : (
							<MDBDataTable
								data={setUsers()}
								className='px-2 ml-1'
								bordered
								striped
								hover
							/>
						)}
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
}