import {
  ACTION_CHANGE_LOADING,
  ACTION_CHANGE_LOGGED_IN,
  ACTION_CHANGE_ALERT,
  ACTION_ADD_USERS_LIST,
  ACTION_CLEAR_USERS_LIST,
  ACTION_ADD_UNVERIFIED_USERS_LIST,
  CREATE_CAR_TYPE,
} from './actionTypes';

export const ChangeActionLoading = (isLoading) => ({
  type: ACTION_CHANGE_LOADING,
  payload: isLoading,
});

export const ChangeActionLoggedIn = (data) => ({
  type: ACTION_CHANGE_LOGGED_IN,
  payload: data,
});

export const ChangeActionAlert = (alert) => ({
  type: ACTION_CHANGE_ALERT,
  payload: alert,
});

export const ActionAddUsersList = (usersList) => ({
  type: ACTION_ADD_USERS_LIST,
  payload: usersList,
});

export const ActionClearUsersList = () => ({
  type: ACTION_CLEAR_USERS_LIST,
});

export const ActionAddUnverifiedUsersList = (usersList) => ({
  type: ACTION_ADD_UNVERIFIED_USERS_LIST,
  payload: usersList,
});

export const createCarType = (type) => ({
  type: CREATE_CAR_TYPE,
  payload: type,
});

export const mapStateToProps = (state) => {
  const { rootReducer, usersList } = state;
  const appState = rootReducer;
  return {
    appState,
    usersList,
  };
};
