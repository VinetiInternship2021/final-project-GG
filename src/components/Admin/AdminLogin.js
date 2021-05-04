import React, {useEffect, useState} from 'react';
import { mapStateToProps } from '../../redux/actions';
import { loginParams } from "../../utils/configs";
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import LoginOnClick from "../../utils/LoginOnClick";
import LoginForm from "../LoginForm";

const AdminLogin = (props) => {
    const history = useHistory()
    const dispatch = props.dispatch
    const state = props.appState
    const [fields, setFields] = useState({
        ...loginParams,
        model_name: 'SuperUser'
    })
    
    useEffect(() => {
        if (state.loggedIn) {
            history.push(`/${state.userType}/${state.userId}`)
        }
    }, [])
    
    return (
        <>
            <LoginForm fields={fields}
                       setFields={setFields}
                       onClick={(event) => LoginOnClick(event, fields, setFields, state, dispatch, history)} />
        </>
    )
}

export default connect(mapStateToProps)(AdminLogin);
