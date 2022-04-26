import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';


import { loadUser } from './redux/actions/authActions';

import ProtectedRoute from './components/route/ProtectedRoute';
import WelcomePage from './components/WelcomePage';
import Register from './components/user/Register';
import VerifyUser from './components/user/VerifyUser';
import Login from './components/common/Login';
import Logout from './components/common/Logout';
import Home  from './components/layout/Home';
import ChangePassword from './components/common/ChangePassword';
import ForgotPassword from './components/common/ForgotPassword';
import ResetPassword from './components/common/ResetPassword';
import UpdateProfile from './components/common/UpdateProfile';
import CreateUser from './components/admin/CreateUser';
import UpdateUser from './components/admin/UpdateUser';
import UsersList from './components/admin/UserList';
import UserDetails from './components/admin/UserDetails';
import GroupList from './components/admin/GroupList';
import CreateGroup from './components/admin/CreateGroup';
import UpdateGroup from './components/admin/UpdateGroup';
import AssignmentList from './components/admin/AssignmentList';
import AssignmentDetail from './components/admin/AssignmentDetail';
import UpdateAssignment from './components/admin/UpdateAssignment';
import CreateAssignment from './components/admin/CreateAssignment';
import SearchTitle from './components/manager/SearchTitle'
import MyAssignments from './components/user/MyAssignments';
import FilterEmployees from './components/manager/FilterEmployees';
import FilterLeader from './components/manager/FilterLeader';
import FilterPriority from './components/manager/FilterPriority';
import FilterStartDate from './components/manager/FilterStartDate';
import FilterEndDate from './components/manager/FilterEndDate';
import CommentList from './components/admin/CommentList';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(loadUser());
    

  }, []);

 
  return (
    <Router>
      <div className="App">
      
        <div className="container container-fluid">
          <Route path="/" component={WelcomePage} exact/>
          <Route path="/register" component={Register} exact/>
          <Route path="/login" component={Login} exact/>
          <Route path="/forgotpassword" component={ForgotPassword} exact/>
          <Route path="/password/reset/:token" component={ResetPassword} exact/>
          <Route path="/logout" component={Logout} exact/>
          <Route path="/confirm/:token" component={VerifyUser} exact/>
          
          <ProtectedRoute path="/home" component={Home} exact/>
          <ProtectedRoute path="/password" component={ChangePassword} exact/>
          <ProtectedRoute path="/update" component={UpdateProfile} exact/>

          <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact/>
          <ProtectedRoute path='/admin/create' isAdmin={true} component={CreateUser} exact />
          <ProtectedRoute path='/admin/user/:id' isAdmin={true} component={UpdateUser} exact />
          <ProtectedRoute path='/user/:id' isAdmin={true} component={UserDetails} exact />

          <ProtectedRoute path='/groups' isAdminManager={true} component={GroupList} exact />
          <ProtectedRoute path='/group' isAdminManager={true} component={CreateGroup} exact />
          <ProtectedRoute path='/group/:id' isAdminManager={true} component={UpdateGroup} exact />

          <ProtectedRoute path='/assignments' isAdminManager={true} component={AssignmentList} exact />
          <ProtectedRoute path='/assigment/:id' component={AssignmentDetail} exact />
          <ProtectedRoute path='/update-assigment/:id' isAdminManager={true} component={UpdateAssignment} exact />
          <ProtectedRoute path='/assignment' isAdminManager={true} component={CreateAssignment} exact />
          
          <ProtectedRoute path='/comments' isAdmin={true} component={CommentList} exact />

          <ProtectedRoute path='/filter-title' isManager={true} component={SearchTitle} exact />
          <ProtectedRoute path='/search/:keyword' isManager={true} component={SearchTitle} exact />

          <ProtectedRoute path='/my' isUser={true} component={MyAssignments} exact />
          <ProtectedRoute path='/filter-employees' isManagerUser={true} component={FilterEmployees} exact />
          <ProtectedRoute path='/filter-leaders' isManagerUser={true} component={FilterLeader} exact />
          <ProtectedRoute path='/filter-priority' isManager={true} component={FilterPriority} exact />
          <ProtectedRoute path='/filter-startdate' isManager={true} component={FilterStartDate} exact />
          <ProtectedRoute path='/filter-enddate' isManagerUser={true} component={FilterEndDate} exact />

        </div>
      </div>
      
    </Router>
  );
}

export default App;
