import React from 'react';
import {useState} from "react";
import {signParams} from "../utils/configs";

const RegistrationForm = (props) => {
  // const onChange = props.onChange()
  const [fields, setFields] = props.data
  
  const onChange = (event) => {
    const params = {
      ...fields,
      alert: ''
    }
    params[event.target.id] = event.target.value
    setFields(params)
    console.log(fields)
  }
  return(
    <div>
      <br />
      <h5>Driver registration</h5>
      <label htmlFor="phone_number" className="form-label">Phone</label>
      <input onChange={
        (e) => onChange(e)
      }
             id="phone_number"
             type="number"
             className="form-control"/>
      <label htmlFor="first_name" className="form-label">First name</label>
      <input onChange={
        (e) => onChange(e)
      }
             id="first_name"
             type="text"
             className="form-control"/>
      <label htmlFor="last_name" className="form-label">Last name</label>
      <input onChange={
        (e) => onChange(e)
      }
             id="last_name"
             type="text"
             className="form-control"/>
      <label htmlFor="password" className="form-label">Password</label>
      <input onChange={
        (e) => onChange(e)
      }
             id="password"
             type="password"
             className="form-control"/>
      <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
      <input onChange={
        (e) => onChange(e)}
             id="password_confirmation"
             type="password"
             className="form-control" />
      {props.children}
    </div>
  )
}

export default RegistrationForm