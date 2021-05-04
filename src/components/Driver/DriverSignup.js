import React, { useState } from 'react';
import {signUp} from '../../utils/API';
import {signParams} from "../../utils/configs";
import RegistrationForm from "../RegistrationForm";
import {ChangeActionLoading,
        ChangeActionLoggedIn,
        mapStateToProps} from '../../redux/actions'
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

const DriverSignup = (props) => {
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
        //dispatch(ChangeActionLoading({'isLoading': true}))
        const params = {
            driver: {
                ...fields
            }
        }
        await signUp(params)
          .then(response => {
              console.log('sign up then')
              dispatch(ChangeActionLoggedIn({
                  ...state,
                  'isLoading': false,
                  'loggedIn': true,
                  'userType': 'Driver',
                  'userId': response.data.user.id
              }))
              history.push(`/${'Driver'}/${response.data.user.id}`)
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
                      console.log('catch ', response)
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
        <div>
            <form className="w-50 border position-absolute top-50 start-50 translate-middle">
                
                <div className="me-3 mx-3">
                    <RegistrationForm onChange={onChange} data={[fields, setFields]} >
                    <label htmlFor="car_manufacturer" className="form-label">Car manufacturer</label>
                    <input onChange={
                        (e) => onChange(e)
                    }
                           id="car_manufacturer"
                           type="text"
                           className="form-control"/>
                    <label htmlFor="car_model" className="form-label">Car model</label>
                    <input onChange={
                        (e) => onChange(e)
                    }
                           id="car_model"
                           type="text"
                           className="form-control"/>
    
                    <label htmlFor="email" className="form-label">Email</label>
                    <input onChange={
                        (e) => onChange(e)
                    }
                           id="email"
                           type="text"
                           className="form-control"/>
    
                    <label htmlFor="car_registration_number" className="form-label">Car registration number</label>
                    <input onChange={
                        (e) => onChange(e)
                    }
                           id="car_registration_number"
                           type="text"
                           className="form-control"/>
                    </RegistrationForm>
                </div>
    
                {fields.alert ?
                  <div id="error_explanation">
                      <div className="alert alert-danger">
                          In form founds {fields.alert.length} errors
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
                
                <button onClick={(e) => { onClickBtn(e) }}
                        type="submit"
                        className="btn btn-outline-success mx-3 mb-3">Submit</button>
            </form>
        </div>
    )
}

export default connect(mapStateToProps)(DriverSignup);