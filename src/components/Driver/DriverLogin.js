import React, { useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../utils/API';
import { loginParams } from "../../utils/configs";
import {ChangeActionLoading,
        ChangeActionLoggedIn,
        mapStateToProps} from '../../redux/actions'
import {connect} from "react-redux";

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
        return (()=>{
          dispatch(ChangeActionLoggedIn(state))
        })
    }, [])

    const onClick = (event) => {
      event.preventDefault()
      dispatch(ChangeActionLoading({'isLoading': true}))
      // setState({...state, isLoading: true})
      Login(event)
        .then()
    }
    
    const Login = async (event) => {
      const params = {
        session: {
          ...fields,
          remember_me: fields.remember_me === true ? '1': '0'
        }
      }
      await login(params)
        .then(response => {
          // setState({...state,
          //   'isLoading': false,
          //   'loggedIn': true,
          //   'userType': '',
          //   'userId': ''})
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
          // setState({...state, 'isLoading': false})
          dispatch(ChangeActionLoggedIn({
            ...state,
            'isLoading': false,
          }))
          setFields({ ...fields, alert: response.message })
        })
    }

    return (
        <>
            <form className="w-25 border position-absolute top-50 start-50 translate-middle">
                <div className="me-3 mx-3">
                    <br />
                    <h5>Driver Login</h5>
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input onClick={() => {
                      setFields({ ...fields, alert: '' })
                    }}
                           onChange={(e) => {
                             setFields({ ...fields, phone_number: e.target.value })
                           }}
                           id="phone"
                           type="number"
                           className="form-control"
                           value={fields.phone} />
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onClick={() => {
                      setFields({ ...fields, alert: '' })
                    }}
                           onChange={(e) => {
                             setFields({ ...fields, password: e.target.value })
                           }}
                           id="password"
                           type="password"
                           className="form-control"
                           value={fields.password} />
                  
                    <label htmlFor="rememberMe" className="form-label">
                    <input
                      className="form-check-input"
                      name="rememberMe"
                      type="checkbox"
                      checked={fields.remember_me}
                      onChange={ (event) =>  setFields({
                          ...fields,
                          remember_me: event.target.checked
                      })
                      } />
                        Remember
                    </label>
                    <p>{fields.alert}</p>
                </div>
                <button onClick={(e) => {
                  onClick(e)
                  }
                } type="submit" className="btn btn-outline-success mx-3 mb-3">Submit</button>
            </form>
        </>
    )
}

export default connect(mapStateToProps)(DriverLogin);
