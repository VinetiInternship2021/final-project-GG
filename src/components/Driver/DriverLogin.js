import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from '../../utils/configs'

const DriverLogin = () => {
    const history = useHistory()
    const [authData, setAuthData] = useState(
      {
          'loggedIn': false, 'userType': 'None', 'userId': 'None'
      })
    const [fields, setFields] = useState({
        phone_number: '',
        password: '',
        model_name: 'Driver',
        remember_me: false,
        alert: ''
    })
    
    useEffect(() => {
        const loginStatusChanger = (data) => {
            setAuthData({  'loggedIn': data.loggedIn,
                'userType': data.userType,
                'userId': data.userId})
        }
        const userInChecker = async () => {
            await axios.get(`http://localhost:3000/api/v1/user_in`,
              {withCredentials: true})
              .then(response => {
                  if (response.data.user_in) {
                      loginStatusChanger({'loggedIn': response.data.user_in,
                          'userType': response.data.model_name,
                          'userId': response.data.user.id} )
                  }
              })
        }
        userInChecker()
        return () => {
            if (authData.loggedIn) {
                history.push(`/${authData.userType}/${authData.userId}`)
            }
        }
    })

    const onClick = (event) => {
        event.preventDefault();
        if (fields.password.length < 6) {
            setFields({ ...fields, alert: 'password length should be at least 6 characters, try again!', password: '' })
        } else if (!fields.phone_number) {
            setFields({ ...fields, alert: 'phone is required!' })
        } else {
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
            axios.defaults.headers.post['Accept'] = '*/*'
            axios.post(`${baseUrl}/login`, {
                  session: {
                      ...fields,
                      remember_me: fields.remember_me === true ? '1': '0'
                  }
              }, {withCredentials: true}
            ).then(response => console.log(response))
        }
    }

    return (
        <>
            <form className="w-25 border position-absolute top-50 start-50 translate-middle">
                <div className="me-3 mx-3">
                    <br />
                    <h5>Driver Login</h5>
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input onClick={() => { setFields({ ...fields, alert: '' }) }} onChange={(e) => { setFields({ ...fields, phone_number: e.target.value }) }} id="phone" type="number" className="form-control" value={fields.phone} />
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onClick={() => { setFields({ ...fields, alert: '' }) }} onChange={(e) => { setFields({ ...fields, password: e.target.value }) }} id="password" type="password" className="form-control" value={fields.password} />
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
                <button onClick={(e) => { onClick(e) }} type="submit" className="btn btn-outline-success mx-3 mb-3">Submit</button>
            </form>
        </>
    )
}

export default DriverLogin;
