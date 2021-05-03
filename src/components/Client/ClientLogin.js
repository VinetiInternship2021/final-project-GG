import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {userIn, login} from '../../utils/API';
import {loginParams} from "../../utils/configs";
import {ChangeActionLoading,
        ChangeActionLoggedIn,
        mapStateToProps} from '../../redux/actions'
import {connect} from "react-redux";
import LoginForm from "../LoginForm";

const ClientLogin = (props) => {
    const history = useHistory()
    const state = props.appState
    const dispatch = props.dispatch
    
    const [fields, setFields] = useState({
        ...loginParams,
        model_name: 'Passenger'
    })
    
    useEffect(() => {
        if (state.loggedIn) {
            history.push(`/${state.userType}/${state.userId}`)
        }
        return (()=>{
            dispatch(ChangeActionLoggedIn(state))
        })
    }, [])
    
    const onClick = (event) => {
        event.preventDefault();
        Login(event)
          .then()
        }

    const Login = async (event) => {
        dispatch(ChangeActionLoading({'isLoading': true}))
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
                  'userId': response.data.user.id
              }))
              history.push(`/${response.data.model_name}/${response.data.user.id}`)
          })
          .catch(response => {
              dispatch(ChangeActionLoggedIn({
                  ...state,
                  'isLoading': false,
              }))
              setFields({ ...fields, alert: response.message })
          })
    }

    return (
        <>
            <LoginForm fields={fields} setFields={setFields} onClick={onClick} />
        </>
    )
}

export default connect(mapStateToProps)(ClientLogin);
