import React from 'react';
import { useHistory } from 'react-router-dom';
import { buttons, appRoutes } from '../utils/configs';

const Login = () => {
  const history = useHistory();
  const onLogin = (button) => {
    let path = '';
    switch (button) {
      case 'Client':
        path = appRoutes.client.login;
        break;
      case 'Driver':
        path = appRoutes.driver.login;
        break;
      default:
        path = '';
    }
    history.push(path);
  };

  const button = buttons.map((item) => (
    <div key={item}>
      <button
        onClick={() => onLogin(item)}
        className="btn btn-outline-success mb-1 w-50"
        type="submit"
      >
        {item}
      </button>
      <br />
    </div>
  ));

  return (
    <div
      className="text-center border position-absolute top-50 start-50 translate-middle"
      style={{ width: '200px', height: '200px' }}
    >
      <h5 className="mt-2">Login</h5>
      <p>Select user type</p>
      {button}
    </div>
  );
};

export default Login;
