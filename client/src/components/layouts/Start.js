import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Landing from './Landing';
import Footer from './Footer';
import Register from '../auth/Register';
import Login from '../auth/Login';

class Start extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default Start;
