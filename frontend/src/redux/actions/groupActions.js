import {
    ALL_GROUP_REQUEST,
    ALL_GROUP_FAIL,
    ALL_GROUP_SUCCESS,
    CREATE_GROUP_REQUEST,
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP_FAIL,
    GROUP_DETAILS_REQUEST,
    GROUP_DETAILS_SUCCESS,
    GROUP_DETAILS_FAIL,
    UPDATE_GROUP_REQUEST,
    UPDATE_GROUP_SUCCESS,
    UPDATE_GROUP_FAIL,
    DELETE_GROUP_REQUEST,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_FAIL,
    CLEAR_ERROR
} from '../../constants/groupConstants'

import axios from 'axios';

export const getAllGroups = () => async (dispatch) => {

    try {

        dispatch({type: ALL_GROUP_REQUEST});

        const {data} = await axios.get('/api/v1/groups');

        dispatch({
            type: ALL_GROUP_SUCCESS,
            payload: data.groups
        })

    } catch (error) {

      dispatch({
        type: ALL_GROUP_FAIL,
        payload: error.response.data.error
      })
    }
}
export const createGroup = group => async (dispatch) => {

	try {

		dispatch({ type: CREATE_GROUP_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('/api/v1/group/create', group, config);

		dispatch({
			type: CREATE_GROUP_SUCCESS,
			payload: data
		});

	} catch (error) {
        console.log(error)
        dispatch({ type: CREATE_GROUP_FAIL, payload: error.response.data.error });
    }
};

export const getGroupDetails = id => async dispatch => {
	try {
		dispatch({ type: GROUP_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/v1/group/${id}`);

		dispatch({ type: GROUP_DETAILS_SUCCESS, payload: data.group });

	} catch (error) {
        console.log(error)
		dispatch({ type: GROUP_DETAILS_FAIL, payload: error.response.data.error });
	}
};

export const updateGroup = (id, groupData) => async dispatch => {

	try {

		dispatch({ type: UPDATE_GROUP_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put(`/api/v1/admin/group/${id}`, groupData, config);

		dispatch({ type: UPDATE_GROUP_SUCCESS, payload: data });
    
	} catch (error) {
		dispatch({ type: UPDATE_GROUP_FAIL, payload: error.response.data.error });
	}
};

export const deleteGroup = id => async dispatch => {

	try {
		dispatch({ type: DELETE_GROUP_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/group/${id}`);

		dispatch({ type: DELETE_GROUP_SUCCESS, payload: data.success });

	} catch (error) {
		dispatch({ type: DELETE_GROUP_FAIL, payload: error.response.data.error });
		
	}
};

export const clearError = () => async (dispatch) => {
    dispatch({type: CLEAR_ERROR});
}
