import React, {useEffect, useState} from 'react';
import { mapStateToProps } from '../../redux/actions';
import { loginParams } from "../../utils/configs";
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import LoginOnClick from "../../utils/LoginOnClick";
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
    }, [])

    return (
        <>
            <LoginForm fields={fields}
                       header={'Passenger Login'}
                       setFields={setFields}
                       onClick={(event) => LoginOnClick(event, fields, setFields, state, dispatch, history)} />
        </>
    )
}

export default connect(mapStateToProps)(ClientLogin);
