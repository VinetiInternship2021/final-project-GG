import { createStore, combineReducers } from 'redux';
import {
  CHANGE_ALERT,
  CHANGE_LOADING,
  CHANGE_LOGGED_IN,
  ADD_USERS,
  CLEAR_USERS,
  ADD_UNVERIFIED_USERS,
  CREATE_CAR_TYPE,
} from './actionTypes';

const initState = {
  isLoading: true,
  loggedIn: false,
  userType: '',
  userId: '',
  alert: '',
  carType: '',
};

const initUsersList = {
  users: [],
  unverifiedUsers: [],
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_LOGGED_IN:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        loggedIn: action.payload.loggedIn,
        userType: action.payload.userType,
        userId: action.payload.userId,
        alert: '',
      };
    case CHANGE_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case CHANGE_ALERT:
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

const usersList = (state = initUsersList, action) => {
  switch (action.type) {
    case ADD_USERS:
      return {
        ...state,
        users: action.payload.usersList,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        unverifiedUsers: [],
      };
    case ADD_UNVERIFIED_USERS:
      return {
        ...state,
        unverifiedUsers: action.payload.usersList,
      };
    default:
      return state;
  }
};

export default createStore(combineReducers(
  {
    rootReducer,
    usersList,
  },
));
