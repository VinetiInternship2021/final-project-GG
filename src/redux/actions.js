import {
  CHANGE_LOADING,
  CHANGE_LOGGED_IN,
  CHANGE_ALERT,
  ADD_USERS,
  CLEAR_USERS,
  ADD_UNVERIFIED_USERS,
  CREATE_CAR_TYPE,
} from './actionTypes';

export const ChangeActionLoading = (isLoading) => ({
  type: CHANGE_LOADING,
  payload: isLoading,
});

export const ChangeActionLoggedIn = (data) => ({
  type: CHANGE_LOGGED_IN,
  payload: data,
});

export const ChangeActionAlert = (alert) => ({
  type: CHANGE_ALERT,
  payload: alert,
});

export const ActionAddUsersList = (usersList) => ({
  type: ADD_USERS,
  payload: usersList,
});

export const ActionClearUsersList = () => ({
  type: CLEAR_USERS,
});

export const ActionAddUnverifiedUsersList = (usersList) => ({
  type: ADD_UNVERIFIED_USERS,
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
