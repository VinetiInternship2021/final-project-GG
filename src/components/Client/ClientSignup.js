import React, { useState } from 'react';
import {signParams} from "../../utils/configs";
import RegistrationForm from "../RegistrationForm";
import {mapStateToProps} from '../../redux/actions'
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import onClickBtn from "../../utils/SignupOnClick";

const ClientSignup = (props) => {
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
              <button onClick={(e) => {
                  onClickBtn(e, fields, setFields, state, dispatch, history)
              }}
                      type="submit"
                      className="btn btn-outline-success mx-3 mb-3">Submit</button>
          </form>
      </>
    )
}

export default connect(mapStateToProps)(ClientSignup);