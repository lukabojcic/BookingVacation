import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  NO_REPOS
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [], //for profile listing page where we have a list of devs
  //repos: [], //github
  loading: true,
  error: {}
};

function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state, //current state
        profile: payload, //we set profile to the payload cause we are sending back response that includes the whole profile so we are adding that to the state
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null
        //repos: []
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    case NO_REPOS:
      return {
        ...state
       // repos: []
      };
    default:
      return state;
  }
}

export default profileReducer;
