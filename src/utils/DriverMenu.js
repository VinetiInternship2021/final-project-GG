import React, { useHistory } from 'react-router-dom';
import { appRoutes, driverPageItems } from './configs';

const DriverMenu = () => {
  const history = useHistory();

  const handleMenu = (event) => {
    let path;
    switch (event.target.innerText) {
      case driverPageItems[0]:
        path = appRoutes.driver;
        break;
      case driverPageItems[1]:
        path = appRoutes.driver.history;
        break;
      case driverPageItems[2]:
        path = appRoutes.driver.settings;
        break;
      case driverPageItems[3]:
        path = appRoutes.driver.profile;
        break;
      default:
        path = '';
    }
    history.push(path);
  };
  return driverPageItems.map((item) => (
    <ul>
      <button
        key={item}
        onClick={
          (e) => {
            handleMenu(e);
          }
        }
        className="list-group-item"
      >
        {item}
      </button>
    </ul>
  ));
};

export default DriverMenu;
