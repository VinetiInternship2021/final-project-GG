import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { appRoutes } from '../../utils/configs';
import { ClientMenu } from '../../utils/ClientMenu';

const ClientSettings = () => {
  const history = useHistory();
  const menuItems = ClientMenu();

  const [fields, setFields] = useState({
    phone: '',
    oldPassword: '',
    newPassword: '',
    cPassword: '',
    name: '',
    alert: '',
  });

  const onClick = (event) => {
    event.preventDefault();
    if (fields.newPassword.length < 6) {
      setFields({ ...fields, alert: 'password length should be at least 6 characters, try again!', newPassword: '' });
    } else if (fields.newPassword === fields.oldPassword) {
      setFields({
        ...fields, alert: 'new passwords should differ from old password, try again!', newPassword: '', cPassword: '',
      });
    } else if (fields.oldPassword.length < 6) {
      setFields({ ...fields, alert: 'old password length should be at least 6 characters, try again!', oldPassword: '' });
    } else if (fields.newPassword !== fields.cPassword) {
      setFields({
        ...fields, alert: 'incorrect password, try again!', newPassword: '', cPassword: '',
      });
    } else if (!fields.name) {
      setFields({ ...fields, alert: 'username is required!' });
    } else if (!fields.phone) {
      setFields({ ...fields, alert: 'phone is required!' });
    } else {
      axios.post('/client/settings', {
        phone: fields.phone,
        username: fields.name,
        password: fields.newPassword,
      })
        .then((response) => response)
        .catch((error) => error);
      history.push(appRoutes.client);
    }
  };

  return (
    <div className="position-relative">
      <div className="card text-center position-absolute top-0 start-0 ms-4 mt-3" style={{ width: '150px', height: '125px' }}>
        <ul className="list-group list-group-flush">
          {menuItems}
        </ul>
      </div>
      <form className="w-25 border position-fixed top-50 start-50 translate-middle">
        <div className="me-3 mx-3">
          <br />
          <h5>Client Settings</h5>
          <label htmlFor="phone" className="form-label">
            Phone
            <br />
            <input
              onClick={
                  () => { setFields({ ...fields, alert: '' }); }
              }
              onChange={
                  (e) => { setFields({ ...fields, phone: e.target.value }); }
              }
              id="phone"
              type="number"
              className="form-control"
              value={fields.phone}
            />

          </label>
          <label htmlFor="name" className="form-label">
            Username
            <br />
            <input
              onClick={
                    () => { setFields({ ...fields, alert: '' }); }
                }
              onChange={
                    (e) => { setFields({ ...fields, name: e.target.value }); }
                }
              id="username"
              type="text"
              className="form-control"
              value={fields.name}
            />
          </label>
          <label htmlFor="oldpassword" className="form-label">
            Old password
            <br />
            <input
              onClick={
                    () => { setFields({ ...fields, alert: '' }); }
                }
              onChange={
                    (e) => { setFields({ ...fields, oldPassword: e.target.value, alert: '' }); }
                }
              id="oldpassword"
              type="password"
              className="form-control"
              value={fields.oldPassword}
            />
          </label>
          <label htmlFor="newpassword" className="form-label">
            New password
            <br />
            <input
              onClick={
                  () => { setFields({ ...fields, alert: '' }); }
              }
              onChange={(e) => { setFields({ ...fields, newPassword: e.target.value, alert: '' }); }}
              id="newpassword"
              type="password"
              className="form-control"
              value={fields.newPassword}
            />
          </label>
          <label htmlFor="cpassword" className="form-label">
            Confirm password
            <br />
            <input
              onClick={
                  () => { setFields({ ...fields, alert: '' }); }
              }
              onChange={(e) => { setFields({ ...fields, cPassword: e.target.value, alert: '' }); }}
              id="cpassword"
              type="password"
              className="form-control"
              value={fields.cPassword}
            />
          </label>
          <p>{fields.alert}</p>
        </div>
        <button onClick={(e) => { onClick(e); }} type="submit" className="btn btn-outline-success mx-3 mb-3">Submit</button>
      </form>
    </div>
  );
};

export default ClientSettings;
