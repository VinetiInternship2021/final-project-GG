import React, { useState } from 'react';
import axios from 'axios';
import {signUp} from '../../utils/API';
import {signParams} from "../../utils/configs";
import RegistrationForm from "../RegistrationForm";

const DriverSignup = () => {
    const [fields, setFields] = useState({
        ...signParams
    })

    const onClickBtn = (event) => {
        event.preventDefault()
        SignUp()
          .then()
    }
    
    const onClick = (event) => {
    }
    
    const onChange = (event) => {
        const params = {
            ...fields,
            alert: ''
        }
        params[event.target.id] = event.target.value
        setFields(params)
        console.log(fields)
    }
    
    const SignUp = async () => {
        const params = {
            driver: {
                ...fields
            }
        }
        await signUp(params)
          .then(response => console.log('success'))
          .catch(response => {
              console.log('catch')
              console.log(response.status)
              let errors = []
              if (response.status === 500) {
                errors.push('This phone number registered')
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
                </div>
                <button onClick={(e) => { onClickBtn(e) }}
                        type="submit"
                        className="btn btn-outline-success mx-3 mb-3">Submit</button>
            </form>
        </>
    )
}

export default DriverSignup;