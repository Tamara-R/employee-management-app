import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ACCOUNT_REQUEST,
    ACCOUNT_SUCCESS,
    ACCOUNT_FAIL,
    VERIFY_ACCOUNT_REQUEST,
    VERIFY_ACCOUNT_SUCCESS,
    VERIFY_ACCOUNT_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    FORGOT_PASSWORD_CLEAR,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERROR
} from "../../constants/authConstants"

export const authReducer = ( state = {user: {}}, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
        case VERIFY_ACCOUNT_REQUEST:
        case ACCOUNT_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }
        case REGISTER_SUCCESS:
          return {
            ...state,
            loading: false,
            isAuthenticated: false,
            success: true,
            user: action.payload
        }
        case ACCOUNT_SUCCESS:
          return {
              ...state,
              loading: false,
              isSuccess: true
          }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
        case VERIFY_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case VERIFY_ACCOUNT_FAIL:
        case ACCOUNT_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT_FAIL:
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


export const userReducers = (state = {user: {}}, action) => {
    switch (action.type) {
    
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
            ...state,
            loading: true
            }
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
            ...state,
            loading: false,
            isUpdated: action.payload
            }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
            ...state,
            loading: false,
            error: action.payload
            }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
            ...state,
            isUpdated: false
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

export const forgotPasswordReducers = (state={user: {}}, action) => {
    switch (action.type) {
      case FORGOT_PASSWORD_REQUEST:
      case RESET_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        }
      case FORGOT_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload
        }
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          success: action.payload
        }
      case FORGOT_PASSWORD_FAIL:
      case RESET_PASSWORD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      case FORGOT_PASSWORD_CLEAR:
        return {
          ...state,
          message: null
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

export const allUsersReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case ALL_USERS_REQUEST:
			return {
				...state,
				loading: true,
			};

		case ALL_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				users: action.payload,
			};

		case ALL_USERS_FAIL:
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

export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};

		case USER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload,
			};

		case USER_DETAILS_FAIL:
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

export const newUserReducer = (state={}, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        loading: true,
        success: false,
      }
    case CREATE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload
      }
    case CREATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
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

export const adminUserReducers = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload
      }
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false
      }
    case DELETE_USER_RESET:
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
