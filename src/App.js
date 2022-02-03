import React, { Component} from 'react';
import {
  
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
// IMPORTED COMPONENTS
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail'; 
import CreateCourse from './components/CreateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut'
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import PrivateRoute from './PrivateRoute';
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import withContext from './Context';

// setting up components with context 
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UserSignUpWithContext = withContext(UserSignUp)
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UpdateCourseWithContext = withContext(UpdateCourse);

class App extends Component {

  //Component Routes 
  render(){
   
    return (
     <Router>
     <div>   
      <HeaderWithContext/>
       <Switch>
         <Route exact path='/' render= {() => <Redirect to= '/courses'/>}  />
         <Route exact path='/courses' render={() => <Courses/>}/>
         <PrivateRoute path='/courses/create' component={ CreateCourseWithContext} />
         <PrivateRoute path= '/courses/:id/update' component={ UpdateCourseWithContext} />
         <Route path='/courses/:id' component={CourseDetailWithContext}/>
         <Route path='/signin' component={UserSignInWithContext}/>
         <Route path='/signup' component={UserSignUpWithContext}/>
         <Route path='/signout' component={UserSignOutWithContext}/>
         <Route path='/notfound' component={NotFound} />
         <Route path='/forbidden' component={Forbidden}/>
         <Route path='/error' component={UnhandledError}/>
         <Route component={NotFound} />
        
       </Switch>
     </div>
      </Router>
    );
  }

}



export default App;
