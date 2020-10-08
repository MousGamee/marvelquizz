import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import  Header  from '../Header';
import Landing from '../Landing';
import Login from '../Login';
import Welcome from '../Welcome';
import SignUp from '../SignUp'
import ErrorPage from '../ErrorPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ForgetPassword from '../ForgetPassword';
function App() {
  return (
    <>
    <Router>
       <Header />
       <Switch> 
         <Route exact path="/" component={Landing} />
         <Route  path="/welcome" component={Welcome} />
         <Route  path="/signup" component={SignUp} />
         <Route  path="/login" component={Login} />
         <Route  path="/forgetpassword" component={ForgetPassword} />
         <Route   component={ErrorPage} />
       </Switch>
       <Footer />
      </Router>
    </>
  );
}

export default App;
