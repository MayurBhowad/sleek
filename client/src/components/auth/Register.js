import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFielGroup';

import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container justify-content-between vh-100">
          <div className="row justify-content-center mt-5">
            <div className="col-xl-5 col-lg-8 col-md-8">
              <div className="card">
                <div className="card-header bg-primary">
                  <div className="app-brand">
                    <Link to="/">
                      <svg
                        className="brand-icon"
                        preserveAspectRatio="xMidYMid"
                        width="30"
                        height="33"
                        viewBox="0 0 30 33"
                      >
                        <g fill="none" fillrrule="evenodd">
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
                    </Link>
                  </div>
                </div>
                <div className="card-body p-5">
                  <h4 className="text-dark mb-5">Sign Up</h4>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                      <div className="form-group col-md-12 mb-4">
                        <TextFieldGroup
                          placeholder="Name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          error={errors.name}
                        />
                      </div>
                      <div className="form-group col-md-12 mb-4">
                        <TextFieldGroup
                          placeholder="Last Name"
                          name="surname"
                          value={this.state.surname}
                          onChange={this.onChange}
                          error={errors.surnamename}
                        />
                      </div>
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
                      <div className="form-group col-md-12 ">
                        <TextFieldGroup
                          placeholder="Confirm Password"
                          name="password2"
                          type="password"
                          value={this.state.password2}
                          onChange={this.onChange}
                          error={errors.password2}
                        />
                      </div>
                      <div className="col-md-12">
                        <div className="d-inline-block mr-3">
                          <label className="control control-checkbox">
                            <input type="checkbox" />
                            <div className="control-indicator"></div>I Agree the
                            terms and conditions
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-lg btn-primary btn-block mb-4"
                        >
                          Sign Up
                        </button>
                        <p>
                          Already have an account?
                          <Link className="text-blue" to="/login">
                            Sign in
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
