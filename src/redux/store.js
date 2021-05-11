import { createStore, combineReducers } from 'redux';
import {
  ACTION_CHANGE_ALERT, ACTION_CHANGE_LOADING,
  ACTION_CHANGE_LOGGED_IN,
  ACTION_ADD_USERS_LIST,
  ACTION_CLEAR_USERS_LIST,
  ACTION_ADD_UNVERIFIED_USERS_LIST,
} from './actionTypes';

const initState = {
  isLoading: true,
  loggedIn: false,
  userType: '',
  userId: '',
  alert: '',
};

const initUsersList = {
  users: [],
  unverifiedUsers: [],
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
    default:
      return state;
  }
};

const usersList = (state = initUsersList, action) => {
  switch (action.type) {
    case ACTION_ADD_USERS_LIST:
      return {
        ...state,
        users: action.payload.usersList,
      };
    case ACTION_CLEAR_USERS_LIST:
      return {
        ...state,
        users: [],
        unverifiedUsers: [],
      };
    case ACTION_ADD_UNVERIFIED_USERS_LIST:
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
