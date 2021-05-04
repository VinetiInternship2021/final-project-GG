import React, { useState } from 'react';
import {signParams} from "../../utils/configs";
import RegistrationForm from "../RegistrationForm";
import {mapStateToProps} from '../../redux/actions'
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import onClickBtn from "../../utils/SignupOnClick";

const DriverSignup = (props) => {
    const history = useHistory()
    const dispatch = props.dispatch
    const state = props.appState
    const [fields, setFields] = useState({
        ...signParams
    })
    
    const onChange = (event) => {
        const params = {
            ...fields,
            alert: ''
        }
        params[event.target.id] = event.target.value
        setFields(params)
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
                
                <button onClick={(e) => {
                    onClickBtn(e, fields, setFields, state, dispatch, history)
                }
                }
                        type="submit"
                        className="btn btn-outline-success mx-3 mb-3">Submit</button>
            </form>
        </div>
    )
}

export default connect(mapStateToProps)(DriverSignup);