import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Footer from './components/layouts/Footer';
import AuthNav from './components/dashboard/AuthNav';
import Dashboard from './components/dashboard/Dashboard';

class AppOne extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    const guest = (
      <div>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
        <Footer />
      </div>
    );

    const authNav = (
      <div>
        <AuthNav />
      </div>
    );

    return <div>{isAuthenticated ? authNav : guest}</div>;
  }
}

AppOne.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AppOne);
