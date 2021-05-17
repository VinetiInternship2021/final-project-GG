import React from 'react';
import { shallow, configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import Login from '../src/components/Login';
import AdminLogin from '../src/components/Admin/AdminLogin';
import { logout } from '../src/utils/API';

describe('Admin testing sets (loggedOut)', () => {
  beforeAll(() => {
    logout();
  });
  configure({ adapter: new Adapter() });
  it('Render correctly Login', () => {
    const component = render(<Login />);
    expect(shallowToJson(component)).toMatchSnapshot();
  });
  it('Render correctly Login admin', () => {
    const component = render(<AdminLogin />);
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
