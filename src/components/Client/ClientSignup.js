import React, { useState } from 'react';
import {signUp} from '../../utils/API';
import {signParams} from "../../utils/configs";
import RegistrationForm from "../RegistrationForm";
import {ChangeActionLoading,
        ChangeActionLoggedIn,
        mapStateToProps} from '../../redux/actions'
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

const ClientSignup = (props) => {
    const history = useHistory()
    const dispatch = props.dispatch
    const state = props.appState
    const [fields, setFields] = useState({
        ...signParams
    })
    
    const onClickBtn = (event) => {
        event.preventDefault()
        SignUp()
          .then()
    }
    
    const onChange = (event) => {
        const params = {
            ...fields,
            alert: ''
        }
        params[event.target.id] = event.target.value
        setFields(params)
    }
    
    const SignUp = async () => {
        // dispatch(ChangeActionLoading({'isLoading': true}))
        const params = {
            passenger: {
                ...fields
            }
        }
        await signUp(params)
          .then(response => {
              dispatch(ChangeActionLoggedIn({
                  ...state,
                  'isLoading': false,
                  'loggedIn': true,
                  'userType': 'Passenger',
                  'userId': response.data.user.id
              }))
              history.push(`/Passenger/${response.data.user.id}`)
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
    
    return (
      <>
          <form className="w-25 border position-absolute top-50 start-50 translate-middle">
              {fields.alert ?
                <div id="error_explanation">
                    <div className="alert alert-danger">
                        In form found {fields.alert.length} errors
                    </div>
                    {fields.alert.map((error, index) => {
                        return (
                          <ul key={index}>
                              {error}
                          </ul>
                        )
                    })}
                </div>
                :
                false
              }
              <div className="me-3 mx-3">
                  <RegistrationForm onChange={onChange} data={[fields, setFields]}/>
              </div>
              <button onClick={(e) => { onClickBtn(e) }}
                      type="submit"
                      className="btn btn-outline-success mx-3 mb-3">Submit</button>
          </form>
      </>
    )
}

export default connect(mapStateToProps)(ClientSignup);