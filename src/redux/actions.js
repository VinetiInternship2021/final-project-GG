import React from 'react'

import { ACTION_CHANGE_LOADING ,
         ACTION_CHANGE_LOGGED_IN} from './actionTypes'

export const ChangeActionLoading = (isLoading) => {
  return {
    type: ACTION_CHANGE_LOADING,
    payload: isLoading
  }
}

export const ChangeActionLoggedIn = (data) => {
  console.log(data, 'actions')
  return {
    type: ACTION_CHANGE_LOGGED_IN,
    payload: data
  }
}

export const mapStateToProps = (state) => {
  const appState = state
  return {
    appState
  }
}
