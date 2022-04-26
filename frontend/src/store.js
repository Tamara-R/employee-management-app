import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer } from './redux/reducers/authReducer';
import { allUsersReducer, userReducers, userDetailsReducer, forgotPasswordReducers, adminUserReducers, newUserReducer } from './redux/reducers/authReducer';
import { allGroupReducers, newGroupReducers, groupDetailsReducer, groupReducers } from './redux/reducers/groupReducer';
import { allAssignmentReducers, assignmentDetailsReducer, 
    assignmentReducers, newAssignmentReducers, newCommentReducers, 
    deleteCommentReducer, getCommentsReducer
} from './redux/reducers/assignmentReducer';


const reducer = combineReducers({
    auth: authReducer,
    allUsers: allUsersReducer,
    user: userReducers,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducers,
    newUser: newUserReducer,
    adminUser: adminUserReducers,
    allGroups: allGroupReducers,
    newGroup: newGroupReducers,
    groupDetails: groupDetailsReducer,
    groups: groupReducers,
    allAssignments: allAssignmentReducers,
    assignmentDetails: assignmentDetailsReducer,
    assignments: assignmentReducers,
    newAssignment: newAssignmentReducers,
    newComment: newCommentReducers,
    deleteComment: deleteCommentReducer,
    getComments: getCommentsReducer, 
});

let initialState = {
};
  
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
  
export default store;