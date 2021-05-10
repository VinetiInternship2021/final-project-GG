import { useHistory } from 'react-router-dom';
import { appRoutes, driverPageItems } from './configs';

export const DriverMenu = () => {
    const history = useHistory();

    const handleMenu = (event) => {
        let path = '';
        switch (event.target.innerText) {
            case driverPageItems[0]:
                path = appRoutes.driver
                break;
            case driverPageItems[1]:
                path = appRoutes.driverHistory
                break;
            case driverPageItems[2]:
                path = appRoutes.driverSettings
                break;
            case driverPageItems[3]:
                path = appRoutes.driverProfile
                break;
            default:
                path = ''
        }
        history.push(path)
    }
    return driverPageItems.map(item =>
        <li key={item} onClick={
            (e) => {
                handleMenu(e)
            }
        }
            className="list-group-item">{item}</li>
    )
}
