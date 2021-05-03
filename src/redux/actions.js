import React from 'react'

import { ACTION_CHANGE_LOADING ,
         ACTION_CHANGE_LOGGED_IN,
         ACTION_CHANGE_ALERT} from './actionTypes'

export const ChangeActionLoading = (isLoading) => {
  return {
    type: ACTION_CHANGE_LOADING,
    payload: isLoading
  }
}

export const ChangeActionLoggedIn = (data) => {
  return {
    type: ACTION_CHANGE_LOGGED_IN,
    payload: data
  }
}

export const ChangeActionAlert = (alert) => {
  return {
    type: ACTION_CHANGE_ALERT,
    payload: alert
  }
}

export const mapStateToProps = (state) => {
  const appState = state
  return {
    appState
  }
}
