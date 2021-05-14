import React from 'react';
import { useHistory } from 'react-router-dom';
import { buttonTexts, appRoutes } from '../utils/configs';

const Signup = () => {
  const history = useHistory();
  let path = '';
  const onSignup = (button) => {
    switch (button) {
      case 'Client':
        path = appRoutes.client.signup;
        break;
      case 'Driver':
        path = appRoutes.driver.signup;
        break;
      default:
        path = '';
    }
    history.push(path);
  };

  const button = buttonTexts.map((item) => (
    <div key={item}>
      <button onClick={() => onSignup(item)} className="btn btn-outline-success mb-1 w-50" type="submit">{item}</button>
      <br />
    </div>
  ));

  return (
    <div
      className="text-center border position-absolute top-50 start-50 translate-middle"
      style={{ width: '200px', height: '200px' }}
    >
      <h5 className="mt-2">Sign up</h5>
      <p>Select user type</p>
      {button}
    </div>
  );
};

export default Signup;
