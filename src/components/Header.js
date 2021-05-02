import React, {useContext, useEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Switch } from '../utils/headerButtonSwitch'
import Context from "./context";
import { headerButtons } from "../utils/configs"

const Header = () => {
    const location = useLocation();
    let history = useHistory();
    const {authData} = useContext(Context)
    const [buttons, setButtons] = useState(headerButtons.loggedOut)
    
    useEffect(()=>{
        if(!authData.isLoading) {
            console.log(authData, 'header')
            if(authData.loggedIn) {
                setButtons(headerButtons.loggedIn)
                console.log(buttons)
            }
            else {
                setButtons(headerButtons.loggedOut)
            }
        }
    },[authData])

    const onSelect = (event, button) => {
        event.preventDefault()
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        history.push(Switch(button, location, authData))
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

export default Header