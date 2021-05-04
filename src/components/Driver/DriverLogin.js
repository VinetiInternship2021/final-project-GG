import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../utils/API';
import { loginParams } from "../../utils/configs";
import { ChangeActionLoading,
         ChangeActionLoggedIn,
         mapStateToProps } from '../../redux/actions';
import { connect } from "react-redux";
import LoginForm from "../LoginForm";

const DriverLogin = (props) => {
  const history = useHistory()
  const dispatch = props.dispatch
  const state = props.appState
  const [fields, setFields] = useState({
      ...loginParams,
      model_name: 'Driver'
  })
  
  useEffect(() => {
    if (state.loggedIn) {
      history.push(`/${state.userType}/${state.userId}`)
    }
  }, [])

    const onClick = (event) => {
      event.preventDefault();
      Login(event)
        .then()
    }
    
    const Login = async (event) => {
      // dispatch(ChangeActionLoading({'isLoading': true}))
      const params = {
        session: {
          ...fields,
          remember_me: fields.remember_me === true ? '1': '0'
        }
      }
      await login(params)
        .then(response => {
          dispatch(ChangeActionLoggedIn({
            ...state,
            'isLoading': false,
            'loggedIn': true,
            'userType': response.data.model_name,
            'userId': response.data.user.id,
            'alert': ''
          }))
          history.push(`/${response.data.model_name}/${response.data.user.id}`)
        })
        .catch(response => {
          dispatch(ChangeActionLoading(false))
          setFields({...fields, alert: response.message})
        })
    }

    return (
        <>
          {/*<ErrorMessages Errors={}/>*/}
          <LoginForm fields={fields} setFields={setFields} onClick={onClick} />
        </>
    )
}

export default connect(mapStateToProps)(DriverLogin)
