import {
    ALL_GROUP_REQUEST,
    ALL_GROUP_FAIL,
    ALL_GROUP_SUCCESS,
    CREATE_GROUP_REQUEST,
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP_FAIL,
    CREATE_GROUP_RESET,
    GROUP_DETAILS_REQUEST,
    GROUP_DETAILS_SUCCESS,
    GROUP_DETAILS_FAIL,
    UPDATE_GROUP_REQUEST,
    UPDATE_GROUP_SUCCESS,
    UPDATE_GROUP_FAIL,
    UPDATE_GROUP_RESET,
    DELETE_GROUP_REQUEST,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_FAIL,
    DELETE_GROUP_RESET,
    CLEAR_ERROR
} from '../../constants/groupConstants'

export const allGroupReducers = ( state = {groups: []}, action ) => {
  switch(action.type) {
    case ALL_GROUP_REQUEST:
      return {
        loading: true,
        groups: []
      }
    case ALL_GROUP_SUCCESS:
      return {
        loading: false,
        groups: action.payload
      }
    case ALL_GROUP_FAIL:
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

export const newGroupReducers = (state = {}, action) => {
    switch (action.type) {
      case CREATE_GROUP_REQUEST:
        return {
          ...state,
          loading: true
        }
      case CREATE_GROUP_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          group: action.payload.group
        }
      case CREATE_GROUP_FAIL:
        return {
          loading: false,
          error: action.payload
        }
      case CREATE_GROUP_RESET:
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

  export const groupDetailsReducer = (state = { group: {} }, action) => {
    switch (action.type) {
      case GROUP_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case GROUP_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          group: action.payload,
        };
  
      case GROUP_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
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

  export const groupReducers = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_GROUP_REQUEST:
      case DELETE_GROUP_REQUEST:
        return {
          ...state,
          loading: true
        }
      case UPDATE_GROUP_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload
        }
      case DELETE_GROUP_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload
        }
      case UPDATE_GROUP_FAIL:
      case DELETE_GROUP_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      case UPDATE_GROUP_RESET:
        return {
          ...state,
          isUpdated: false
        }
      case DELETE_GROUP_RESET:
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