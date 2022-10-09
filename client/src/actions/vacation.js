import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_VACATIONS,
  VACATION_ERROR,
  DELETE_VACATION,
  ADD_VACATION,
  GET_VACATION,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

// Get posts
export const getVacations = () => async dispatch => {
  try {
    const res = await api.get('/vacations');

    dispatch({
      type: GET_VACATIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VACATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Delete post
export const deleteVacation = id => async dispatch => {
  try {
    await api.delete(`/vacations/${id}`);

    dispatch({
      type: DELETE_VACATION,
      payload: id
    });

    dispatch(setAlert('Vacation Removed', 'success'));
  } catch (err) {
    dispatch({
      type: VACATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addVacation = formData => async dispatch => {
  try {
    const res = await api.post('/vacations', formData);

    dispatch({
      type: ADD_VACATION,
      payload: res.data
    });

    dispatch(setAlert('Vacation Created', 'success'));
  } catch (err) {
    dispatch({
      type: VACATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getVacation = id => async dispatch => {
  try {
    const res = await api.get(`/vacations/${id}`);

    dispatch({
      type: GET_VACATION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VACATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (vacationId, formData) => async dispatch => {
  try {
    const res = await api.post(`/vacations/comment/${vacationId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: VACATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (vacationId, commentId) => async dispatch => {
  try {
    await api.delete(`/vacations/comment/${vacationId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: VACATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
