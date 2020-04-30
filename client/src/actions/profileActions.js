import axios from 'axios';

import { PROFILE_LOADING, GET_PROFILE, CLEAR_CURRENT_PROFILE } from './types';

//GET CURRENT PROFILE
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profiles')
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

//PROFILE LOADING
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

//CLEAR PROFILE
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
