import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import store from './store';

import './App.css';
import './assets/01/css/style.css';
// Sleek imports
import './assets/02/assets/css/sleek.css';
import './assets/02/assets/plugins/toaster/toastr.min.css';
import './assets/02/assets/plugins/nprogress/nprogress.css';
import './assets/02/assets/plugins/flag-icons/css/flag-icon.min.css';
import './assets/02/assets/plugins/jvectormap/jquery-jvectormap-2.0.3.css';
import './assets/02/assets/plugins/ladda/ladda.min.css';
import './assets/02/assets/plugins/select2/css/select2.min.css';
import './assets/02/assets/plugins/daterangepicker/daterangepicker.css';

import Start from './components/layouts/Start';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AuthNav from './components/dashboard/AuthNav';
import AppOne from './AppOne';

//CHECK FOR TOKEN
if (localStorage.jwtToken) {
  //SET AUTH TOKEN HEADER AUTH
  setAuthToken(localStorage.jwtToken);
  //DECODE TOKEN AND GET USER INFO AND EXP
  const decoded = jwt_decode(localStorage.jwtToken);
  //SET USER AND isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //CHECK FOR EXPIRED TOKEN
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //LOGOUT USER
    store.dispatch(logoutUser());
    //CLEAR CURRENT PROFILE
    store.dispatch(clearCurrentProfile());
    //REDIRECT TO LOGIN
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppOne />
        </div>
        <div></div>
      </Router>
    </Provider>
  );
}

export default App;
