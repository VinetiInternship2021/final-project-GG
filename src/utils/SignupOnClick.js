import React from 'react'
import {signUp} from "./API";
import {ChangeActionLoading, ChangeActionLoggedIn} from "../redux/actions";

const onClickBtn = (event, fields, setFields, state, dispatch, history, params) => {
  event.preventDefault()
  SignUp(fields, setFields, state, dispatch, history, params)
    .then()
}

const SignUp = async (fields, setFields, state, dispatch, history, params) => {
  await signUp(params)
    .then(response => {
      dispatch(ChangeActionLoggedIn({
        ...state,
        'isLoading': false,
        'loggedIn': true,
        'userType': response.data.userType,
        'userId': response.data.user.id
      }))
      history.push(`/${response.data.userType}/${response.data.user.id}`)
    })
    .catch(response => {
      let errors = []
      if (response.status === 500) {
        errors.push('This phone number registered')
        dispatch(ChangeActionLoading({'isLoading': false}))
        setFields({ ...fields, alert: errors })
      }
      else {
        if (!response.created) {
          Object.entries(response.errors).map((error) => {
            errors.push(`${error[0]} ${error[1]}`)
          })
          setFields({ ...fields, alert: errors })
        }
        else {
          setFields({ ...fields, alert: response.message })
        }
      }
    })
}

export default onClickBtn