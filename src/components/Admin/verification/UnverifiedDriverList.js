import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ClientFieldDriver from '../ClientFieldDriver';
import validateDriver from './validateDriver';
import { baseUrl } from '../../../utils/configs';

const UNVERIFIED_URL = `${baseUrl}/admin/unverified_drivers`;

export default function UnverifiedDriverList() {
  const [unverifiedDrivers, setUnverifiedDrivers] = useState([]);

  useEffect(() => {
    axios.defaults.headers.get.Accept = '*/*';

    axios.get(UNVERIFIED_URL,
      {
        'Accept-Encoding': 'gzip, deflate, br',
        withCredentials: true,
      })
      .then((res) => {
        setUnverifiedDrivers(res.data);
      });
  }, []);

  const handleVerify = (id) => () => {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.post.Accept = '*/*';

    axios.post(UNVERIFIED_URL,
      { id },
      { withCredentials: true })
      .then((res) => {
        if (res.statusText === 'OK') {
          setUnverifiedDrivers(unverifiedDrivers.filter((driver) => driver.id !== id));
        }
      });
  };

  return (
    <>
      <ul>
        {unverifiedDrivers.map((driver) => (
          <li key={driver.id}>
            <ClientFieldDriver
              driver={validateDriver(driver)}
              onClick={handleVerify(driver.id)}
            />
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
}
