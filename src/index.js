import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import App from './App';
import Register from './screens/Register'
import Login from './screens/Login'
import Forget from './screens/Forget'
import Activate from './screens/Activate'
import Reset from './screens/Reset'
import Admin from './screens/Admin'
import Private from './screens/Private'
import List from './screens/List'
import Profile from './screens/Profile'

import PrivateRoute from './Routes/PrivateRoute'
import AdminRoute from './Routes/AdminRoute'

import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
   <BrowserRouter>
        <Switch>
          <Route path='/' exact render={props => <App {...props} />}/>
          <Route path='/register' exact render={props => <Register {...props} />}/>
          <Route path='/login' exact render={props => <Login {...props} />}/>
          <Route path='/users/password/forget' exact render={props => <Forget {...props} />}/>
          <Route path='/users/activate/:token' exact render={props => <Activate {...props} />}/>
          <Route path='/users/password/reset/:token' exact render={props => <Reset {...props} />}/>
          <PrivateRoute path="/private" exact component={Private} />
          <PrivateRoute path="/private/List" exact component={List} />
          <PrivateRoute path="/private/Profile" exact component={Profile} />
       <AdminRoute path="/admin" exact component={Admin} />
      <Redirect to='/' />    
        </Switch>
   </BrowserRouter>,
  document.getElementById('root')
);
