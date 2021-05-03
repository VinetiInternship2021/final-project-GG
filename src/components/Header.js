import React, { useEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Switch } from '../utils/headerButtonSwitch'
import { headerButtons } from "../utils/configs"
import { logout } from "../utils/API";
import {ChangeActionLoggedIn,
        ChangeActionLoading,
        mapStateToProps} from '../redux/actions'
import {connect} from "react-redux";

const Header = (props) => {
    let state = props.appState
    const dispatch = props.dispatch
    const location = useLocation();
    let history = useHistory();
    const [buttons, setButtons] = useState(headerButtons.loggedOut)
    
    useEffect(()=>{
        if(state.isLoading === false) {
            if(state.loggedIn) {
                setButtons(headerButtons.loggedIn)
            }
            else {
                setButtons(headerButtons.loggedOut)
            }
        }
        
    }, [state.loggedIn])

    const onSelect = async (event, button) => {
        // event.preventDefault()
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        if (button === 'Logout') {
            dispatch(ChangeActionLoading({'isLoading': true}))
            await logout()
              .then(() => dispatch(ChangeActionLoggedIn({
                  'isLoading': false,
                  'loggedIn': false,
                  'userType': '',
                  'userId': ''
              })))
              .then()
        }
        history.push(Switch(button, location, state))
    }
    
    const button = buttons.map((button) => {
        return(
          <button key={button}
                  onClick={(event) => onSelect(event, button)}
                  className="btn btn-outline-success me-1"
                  type="submit">{button}</button>
        )})

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <p className="navbar-brand">GG Clone App</p>
                <form className="d-flex">
                    {button}
                </form>
            </div>
        </nav>
    )
}

export default connect(mapStateToProps)(Header)