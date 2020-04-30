import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';

import TextFieldGroup from '../common/TextFielGroup';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="container d-flex flex-column justify-content-between vh-100">
          <div className="row justify-content-center mt-5">
            <div className="col-xl-5 col-lg-6 col-md-10">
              <div className="card">
                <div className="card-header bg-primary">
                  <div className="app-brand">
                    <a href="/index.html">
                      <svg
                        className="brand-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid"
                        width="30"
                        height="33"
                        viewBox="0 0 30 33"
                      >
                        <g fill="none" fillRule="evenodd">
                          <path
                            className="logo-fill-blue"
                            fill="#7DBCFF"
                            d="M0 4v25l8 4V0zM22 4v25l8 4V0z"
                          />
                          <path
                            className="logo-fill-white"
                            fill="#FFF"
                            d="M11 4v25l8 4V0z"
                          />
                        </g>
                      </svg>
                      <span className="brand-name">Sleek Dashboard</span>
                    </a>
                  </div>
                </div>
                <div className="card-body p-5">
                  <h4 className="text-dark mb-5">Sign In</h4>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="form-group col-md-12 mb-4">
                        <TextFieldGroup
                          placeholder="Email Address"
                          name="email"
                          type="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          error={errors.email}
                        />
                      </div>
                      <div className="form-group col-md-12 ">
                        <TextFieldGroup
                          placeholder="Password"
                          name="password"
                          type="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          error={errors.password}
                        />
                      </div>
                      <div className="col-md-12">
                        <div className="d-flex my-2 justify-content-between">
                          <div className="d-inline-block mr-3">
                            <label className="control control-checkbox">
                              Remember me
                              <input type="checkbox" />
                              <div className="control-indicator"></div>
                            </label>
                          </div>
                          <p>
                            <Link className="text-blue" to="#">
                              Forgot Your Password?
                            </Link>
                          </p>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-lg btn-primary btn-block mb-4"
                        >
                          Sign In
                        </button>
                        <p>
                          Don't have an account yet ?
                          <Link className="text-blue" to="/register">
                            Sign Up
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
