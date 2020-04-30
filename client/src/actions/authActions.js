import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//REGISTER USER
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/register', userData)
    .then((res) => history.push('/login'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//LOGIN - GET USER TOKEN
export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      //SAVE TO LCALSTORAGE
      const { token } = res.data;
      //SET TOKEN TO LS
      localStorage.setItem('jwtToken', token);
      //SET TOKEN TO AUTH HEADER
      setAuthToken(token);
      //DECODE TOKEN TO GET USER DATA
      const decoded = jwt_decode(token);
      //SET CURRENT USER
      dispatch(setCurrentUser(decoded));
      window.location.assign('/dashboard');
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//SET LOGGED IN USER
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//LOG USER OUT
export const logoutUser = (history) => (dispatch) => {
  //REMOVE TOKEN FROM LOCALSTORAGE
  localStorage.removeItem('jwtToken');
  //REMOVE AUTH HEADER FOR FUTURR REQUESTS
  setAuthToken(false);
  //SET CURRENT USER TO {} WHICH SET isAuthenticated TO FALSE
  dispatch(setCurrentUser({}));
  // history.push('/');
  window.location.assign('/');
};
