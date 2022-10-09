import {
  GET_VACATIONS,
  VACATION_ERROR,
  DELETE_VACATION,
  ADD_VACATION,
  GET_VACATION,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  vacations: [],
  vacation: null,
  loading: true,
  error: {}
};

function vacationReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VACATIONS:
      return {
        ...state,
       vacations: payload,
        loading: false
      };
    case GET_VACATION:
      return {
        ...state,
        vacation: payload,
        loading: false
      };
    case ADD_VACATION:
      return {
        ...state,
        vacations: [payload, ...state.vacations],
        loading: false
      };
    case DELETE_VACATION:
      return {
        ...state,
        vacations: state.vacations.filter((vacation) => vacation._id !== payload),
        loading: false
      };
    case VACATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    
    case ADD_COMMENT:
      return {
        ...state,
        vacation: { ...state.vacation, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        vacation: {
          ...state.vacation,
          comments: state.vacation.comments.filter(
            (comment) => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}

export default vacationReducer;
