import {
    ALL_ASSIGNMENT_REQUEST,
    ALL_ASSIGNMENT_SUCCESS,
    ALL_ASSIGNMENT_FAIL,
    ASSIGNMENT_DETAILS_REQUEST,
    ASSIGNMENT_DETAILS_SUCCESS,
    ASSIGNMENT_DETAILS_FAIL,
    CREATE_ASSIGNMENT_REQUEST,
    CREATE_ASSIGNMENT_SUCCESS,
    CREATE_ASSIGNMENT_RESET,
    CREATE_ASSIGNMENT_FAIL,
    UPDATE_ASSIGNMENT_REQUEST,
    UPDATE_ASSIGNMENT_SUCCESS,
    UPDATE_ASSIGNMENT_RESET,
    UPDATE_ASSIGNMENT_FAIL,
    DELETE_ASSIGNMENT_REQUEST,
    DELETE_ASSIGNMENT_SUCCESS,
    DELETE_ASSIGNMENT_RESET,
    DELETE_ASSIGNMENT_FAIL,
    SEARCH_ASSIGNMENT_REQUEST,
    SEARCH_ASSIGNMENT_SUCCESS,
    SEARCH_ASSIGNMENT_FAIL,
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_RESET, 
    CREATE_COMMENT_FAIL,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_RESET,
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

export const allAssignmentReducers = ( state = {assigments: []}, action ) => {
    switch(action.type) {
      case ALL_ASSIGNMENT_REQUEST:
      case SEARCH_ASSIGNMENT_REQUEST:
      case SORT_LEADER_REQUEST:
      case SORT_LEADER_DESC_REQUEST:
      case SORT_EMPLOYEE_REQUEST:
      case SORT_EMPLOYEE_DESC_REQUEST:
      case SORT_DATE_REQUEST:
      case SORT_DATE_DESC_REQUEST:
        return {
          loading: true,
          assigments: []
        }
      case ALL_ASSIGNMENT_SUCCESS:
      case SORT_EMPLOYEE_SUCCESS:
      case SORT_EMPLOYEE_DESC_SUCCESS:
      case SORT_DATE_SUCCESS:
      case SORT_DATE_DESC_SUCCESS:
        return {
          loading: false,
          assigmentCount: action.payload.assigmentCount,
          assigments: action.payload.assigments,
          
        }
      case SEARCH_ASSIGNMENT_SUCCESS:
      case SORT_LEADER_SUCCESS:
      case SORT_LEADER_DESC_SUCCESS:
        return {
          loading: false,
          assigmentCount: action.payload.assigmentCount,
          assigments: action.payload.assigments,
          resPerPage: action.payload.resPerPage,
          
        }
      case ALL_ASSIGNMENT_FAIL:
      case SEARCH_ASSIGNMENT_FAIL:
      case SORT_LEADER_FAIL:
      case SORT_EMPLOYEE_FAIL:
      case SORT_DATE_FAIL:
      case SORT_LEADER_DESC_FAIL:
      case SORT_EMPLOYEE_DESC_FAIL:
      case SORT_DATE_DESC_FAIL:
        return {
          loading: false,
          error: action.payload
      }
      case CLEAR_ERROR: 
      return {
          ...state,
          error: null
      }
      default:
        return state;
    }
}



export const assignmentDetailsReducer = (state = {assigment: {}}, action) => {
  switch (action.type) {
      case ASSIGNMENT_DETAILS_REQUEST:
          return {
          ...state,
          loading: true
          }
      case ASSIGNMENT_DETAILS_SUCCESS:
          return {
          loading: false,
          assigment: action.payload.assigment
          }
      case ASSIGNMENT_DETAILS_FAIL:
          return {
          ...state,
          error: action.payload
          }
      case CLEAR_ERROR:
          return {
          ...state,
          error: null
          }
      default:
          return state;
  }
}

export const newAssignmentReducers = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ASSIGNMENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_ASSIGNMENT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        assignment: action.payload.assigment
      }
    case CREATE_ASSIGNMENT_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CREATE_ASSIGNMENT_RESET:
      return {
        ...state,
        success: false
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
}

export const assignmentReducers = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ASSIGNMENT_REQUEST:
    case DELETE_ASSIGNMENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      }
    case DELETE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload
      }
    case UPDATE_ASSIGNMENT_FAIL:
    case DELETE_ASSIGNMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UPDATE_ASSIGNMENT_RESET:
      return {
        ...state,
        isUpdated: false
      }
    case DELETE_ASSIGNMENT_RESET:
      return {
        ...state,
        isDeleted: false
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export const newCommentReducers = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_COMMENT_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      }
    case CREATE_COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CREATE_COMMENT_RESET:
      return {
        ...state,
        success: false
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
}

export const deleteCommentReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_COMMENT_REQUEST:
			return {
				...state,
				loading: true,
			};

		case DELETE_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};

		case DELETE_COMMENT_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case DELETE_COMMENT_RESET:
			return {
				...state,
				isDeleted: false,
			};

		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const getCommentsReducer = (state = { comment: [] }, action) => {
	switch (action.type) {
		case ALL_COMMENT_REQUEST:
			return {
				...state,
				loading: true,
			};

		case ALL_COMMENT_SUCCESS:
			return {
				loading: false,
				comments: action.payload,
			};

		case ALL_COMMENT_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

