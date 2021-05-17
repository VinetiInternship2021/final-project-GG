import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import Login from '../src/components/Login';
import { login, logout } from '../src/utils/API';
import { loginParams } from '../src/utils/configs';
import ClientFieldPassenger from '../src/components/Admin/ClientFieldPassenger';
import ClientFieldDriver from '../src/components/Admin/ClientFieldDriver';
import ClientFieldDefault from '../src/components/Admin/ClientFieldDefault';

describe('Admin testing sets (loggedOut)', () => {
  beforeAll(() => {
    logout();
  });
  configure({ adapter: new Adapter() });
  it('Render correctly Login', () => {
    const component = render(<Login />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });
});

describe('Admin testing sets (loggedIn)', () => {
  beforeAll(() => {
    const params = loginParams;
    params.phone_number = '077808489';
    params.password = '12345678';
    params.model_name = 'SuperUser';

    login(params);
  });
  configure({ adapter: new Adapter() });

  it('Render correctly ClientFieldPassenger', () => {
    const component = render(<ClientFieldPassenger passenger={{
      id: 1, phoneNumber: '094808489', firstName: 'Artyom', lastName: 'Kosakyan',
    }}
    />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('Render correctly ClientFieldDriver', () => {
    const component = render(<ClientFieldDriver passenger={{
      id: 1,
      phoneNumber: '094808489',
      firstName: 'Artyom',
      lastName: 'Kosakyan',
      isActive: false,
      isVerifiedByAdmin: false,
    }}
    />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('Render correctly ClientFieldDefault', () => {
    const component = render(<ClientFieldDefault />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
