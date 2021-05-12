import {
  ACTION_CHANGE_LOADING,
  ACTION_CHANGE_LOGGED_IN,
  ACTION_CHANGE_ALERT,
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

export const createCarType = (type) => ({
  type: CREATE_CAR_TYPE,
  payload: type,
});

export const mapStateToProps = (state) => {
  const appState = state;
  return {
    appState,
  };
};
