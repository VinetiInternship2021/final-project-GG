import {useHistory} from 'react-router-dom';
import {appRoutes, clientPageItems} from './configs';

export const ClientMenu = () => {
    const history = useHistory();

    const handleMenu = (event) => {
        let path = '';
        switch (event.target.innerText) {
            case 'New order':
                path = appRoutes.client
                break;
            case 'My history':
                path = appRoutes.clientHistory
                break;
            case 'Settings':
                path = appRoutes.clientSettings
                break;
            default:
                path = ''
        }
        history.push(path)
    }
    return clientPageItems.map(item =>
      <li key={item} onClick={
          (e) => {
          handleMenu(e)
          }
      }
          className="list-group-item">{item}</li>
    )
}
