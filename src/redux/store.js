import { createStore } from 'redux';
import {
  ACTION_CHANGE_ALERT, ACTION_CHANGE_LOADING,
  ACTION_CHANGE_LOGGED_IN, CREATE_CAR_TYPE,
} from './actionTypes';

const initState = {
  isLoading: true,
  loggedIn: false,
  userType: '',
  userId: '',
  alert: '',
  carType: '',
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_CHANGE_LOGGED_IN:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        loggedIn: action.payload.loggedIn,
        userType: action.payload.userType,
        userId: action.payload.userId,
        alert: '',
      };
    case ACTION_CHANGE_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case ACTION_CHANGE_ALERT:
      return {
        ...state,
        alert: action.payload.alert,
      };
    case CREATE_CAR_TYPE:
      return {
        ...state,
        carType: action.payload.type,
      };
    default:
      return state;
  }
};
export default createStore(rootReducer);
