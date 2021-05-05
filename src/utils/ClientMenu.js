import {useHistory} from 'react-router-dom';
import {appRoutes, clientPageItems, DriverPageButtons} from './configs';
import {PageButton} from "../components/Buttons";
import React from "react";

export const ClientMenu = () => {
    const history = useHistory();

    const handleMenu = (event) => {
        let path = '';
        switch (event.target.innerText) {
            case 'New order':
                path = `${location.pathname}/${appRoutes.client}`
                break;
            case 'My history':
                path = `${location.pathname}/${appRoutes.clientHistory}`
                break;
            case 'Settings':
                path = `${location.pathname}/${appRoutes.clientSettings}`
                break;
            default:
                path = ''
        }
        history.push(path)
    }
    return clientPageItems.map((item) => {
        return(
          <PageButton button={item[0]}
                      onSelect={handleMenu}
                      buttonClassName={'column'}
                      className={item[1]}/>
        )
    })
}

export default ClientMenu
