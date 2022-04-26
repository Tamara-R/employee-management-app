import {
    ALL_ASSIGNMENT_REQUEST,
    ALL_ASSIGNMENT_SUCCESS,
    ALL_ASSIGNMENT_FAIL,
    ASSIGNMENT_DETAILS_REQUEST,
    ASSIGNMENT_DETAILS_SUCCESS,
    ASSIGNMENT_DETAILS_FAIL,
    CREATE_ASSIGNMENT_REQUEST,
    CREATE_ASSIGNMENT_SUCCESS,
    CREATE_ASSIGNMENT_FAIL,
    UPDATE_ASSIGNMENT_REQUEST,
    UPDATE_ASSIGNMENT_SUCCESS,
    UPDATE_ASSIGNMENT_FAIL,
    DELETE_ASSIGNMENT_REQUEST,
    DELETE_ASSIGNMENT_SUCCESS,
    DELETE_ASSIGNMENT_FAIL,
    SEARCH_ASSIGNMENT_REQUEST,
    SEARCH_ASSIGNMENT_SUCCESS,
    SEARCH_ASSIGNMENT_FAIL,
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAIL,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
    ALL_COMMENT_REQUEST,
    ALL_COMMENT_SUCCESS,
    ALL_COMMENT_FAIL,
    SORT_LEADER_REQUEST,
    SORT_LEADER_SUCCESS,
    SORT_LEADER_FAIL,
    SORT_DATE_REQUEST,
    SORT_DATE_SUCCESS,
    SORT_DATE_FAIL,
    SORT_EMPLOYEE_REQUEST,
    SORT_EMPLOYEE_SUCCESS,
    SORT_EMPLOYEE_FAIL,
    SORT_LEADER_DESC_REQUEST,
    SORT_LEADER_DESC_SUCCESS,
    SORT_LEADER_DESC_FAIL,
    SORT_DATE_DESC_REQUEST,
    SORT_DATE_DESC_SUCCESS,
    SORT_DATE_DESC_FAIL,
    SORT_EMPLOYEE_DESC_REQUEST,
    SORT_EMPLOYEE_DESC_SUCCESS,
    SORT_EMPLOYEE_DESC_FAIL,
    CLEAR_ERROR
} from '../../constants/assignmentConstants';

import axios from 'axios';

export const getAllAssigments = () => async (dispatch) => {

    try {

        dispatch({type: ALL_ASSIGNMENT_REQUEST});

        const {data} = await axios.get('/api/v1/assignments');
        
        dispatch({
            type: ALL_ASSIGNMENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: ALL_ASSIGNMENT_FAIL,
            payload: error.response.data.error
        })
    }
}

export const searchAllAssigments = (keyword = '', currentPage = 1, creatorFullName ) => async (dispatch) => {

    try {

        dispatch({type: SEARCH_ASSIGNMENT_REQUEST});

        let link=`/api/v1/assignments/search?keyword=${keyword}&page=${currentPage}`;
        
        if (creatorFullName) {
            link=`/api/v1/assignments/search?keyword=${keyword}&page=${currentPage}&creatorFullName=${creatorFullName}`
        }
        

        const { data } = await axios.get(link);
        dispatch({
            type: SEARCH_ASSIGNMENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        
        dispatch({
            type: SEARCH_ASSIGNMENT_FAIL,
            payload: error.response.data.error
        })
    }
}


export const getAssignmentDetails = (id) => async (dispatch) => {

    try {

        dispatch({type: ASSIGNMENT_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/assigment/${id}`);
        
        dispatch({type: ASSIGNMENT_DETAILS_SUCCESS, payload: data});

    } catch (error) {
        
        dispatch({type: ASSIGNMENT_DETAILS_FAIL});
    }
}

export const createAssignment = assignment => async (dispatch) => {

	try {

		dispatch({ type: CREATE_ASSIGNMENT_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('/api/v1/assigment/create', assignment, config);

		dispatch({
			type: CREATE_ASSIGNMENT_SUCCESS,
			payload: data
		});

	} catch (error) {
        console.log(error.response.data)
        dispatch({ type: CREATE_ASSIGNMENT_FAIL, payload: error.response.data.error });
        
    }
};

// admin
export const updateAssignment = (id, assignmentData) => async dispatch => {

	try {

		dispatch({ type: UPDATE_ASSIGNMENT_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put(`/api/v1/admin/assigment/${id}`, assignmentData, config);

		dispatch({ type: UPDATE_ASSIGNMENT_SUCCESS, payload: data });
    
	} catch (error) {
        
		dispatch({ type: UPDATE_ASSIGNMENT_FAIL, payload: error.response.data.error });
        console.log(error.response)
	}
};

export const deleteAssigments = id => async dispatch => {

	try {
		dispatch({ type: DELETE_ASSIGNMENT_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/assigment/${id}`);

		dispatch({ type: DELETE_ASSIGNMENT_SUCCESS, payload: data.success });

	} catch (error) {
		dispatch({ type: DELETE_ASSIGNMENT_FAIL, payload: error.response.data.error });
		
	}
};

export const createComment = comment => async (dispatch) => {

	try {

		dispatch({ type: CREATE_COMMENT_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put('/api/v1/comment', comment, config);

		dispatch({
			type: CREATE_COMMENT_SUCCESS,
			payload: data.success
		});

	} catch (error) {
       
        dispatch({ type: CREATE_COMMENT_FAIL, payload: error.response.data.error });
        console.log(error.response.data)
    }
};

export const deleteComment = (id, assignmentId) => async dispatch => {
	try {
		dispatch({ type: DELETE_COMMENT_REQUEST });

		const { data } = await axios.delete(
			`/api/v1/comments?id=${id}&assignmentId=${assignmentId}`
		);

		dispatch({
			type: DELETE_COMMENT_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		console.log(error.response);

		dispatch({
			type: DELETE_COMMENT_FAIL,
			payload: error.response.data.error,
		});
	}
};

export const getComments = (id) => async (dispatch) => {
	try {
		dispatch({ type: ALL_COMMENT_REQUEST});
        // passing the id of the product
		const { data } = await axios.get(`/api/v1/comments?id=${id}`);

		dispatch({ type: ALL_COMMENT_SUCCESS, payload: data.comments });

	} catch (error) {
		dispatch({ type: ALL_COMMENT_FAIL, payload: error.response.data.error });
	}
};

// sorting
export const sortByLeaderAssigments = (keyword = '', currentPage = 1) => async (dispatch) => {

    try {

        dispatch({type: SORT_LEADER_REQUEST});

        const { data } = await axios.get(`/api/v1/sort/leader?keyword=${keyword}&page=${currentPage}`);
        
        dispatch({
            type: SORT_LEADER_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: SORT_LEADER_FAIL,
            payload: error.response.data.error
        })
    }
}

export const descByLeaderAssigments = (keyword = '', currentPage = 1) => async (dispatch) => {

    try {

        dispatch({type: SORT_LEADER_DESC_REQUEST});

        const { data } = await axios.get(`/api/v1/desc/leader?keyword=${keyword}&page=${currentPage}`);
        
        dispatch({
            type: SORT_LEADER_DESC_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: SORT_LEADER_DESC_FAIL,
            payload: error.response.data.error
        })
    }
}

export const sortByEmployeesAssigments = () => async (dispatch) => {

    try {

        dispatch({type: SORT_EMPLOYEE_REQUEST});

        const {data} = await axios.get('/api/v1/sort/empolyee');
        
        dispatch({
            type: SORT_EMPLOYEE_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: SORT_EMPLOYEE_FAIL,
            payload: error.response.data.error
        })
    }
}

export const descByEmployeesAssigments = () => async (dispatch) => {

    try {

        dispatch({type: SORT_EMPLOYEE_DESC_REQUEST});

        const {data} = await axios.get('/api/v1/desc/empolyee');
        
        dispatch({
            type: SORT_EMPLOYEE_DESC_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: SORT_EMPLOYEE_DESC_FAIL,
            payload: error.response.data.error
        })
    }
}

export const sortByFinishDateAssigments = () => async (dispatch) => {

    try {

        dispatch({type: SORT_DATE_REQUEST});

        const {data} = await axios.get('/api/v1/sort/date');
        
        dispatch({
            type: SORT_DATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: SORT_DATE_FAIL,
            payload: error.response.data.error
        })
    }
}

export const descByEndDateAssigments = () => async (dispatch) => {

    try {

        dispatch({type: SORT_DATE_DESC_REQUEST});

        const {data} = await axios.get('/api/v1/desc/date');
        
        dispatch({
            type: SORT_DATE_DESC_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: SORT_DATE_DESC_FAIL,
            payload: error.response.data.error
        })
    }
}

export const clearError = () => async (dispatch) => {
    dispatch({type: CLEAR_ERROR});
}