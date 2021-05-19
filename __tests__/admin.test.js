import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import Login from '../src/components/Login';
import ClientFieldDriver from '../src/components/Admin/ClientFieldDriver';
import ClientFieldPassenger from '../src/components/Admin/ClientFieldPassenger';

describe('Admin testing sets (loggedOut)', () => {
  configure({ adapter: new Adapter() });
  it('Render correctly Login', () => {
    const component = render(<Login />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('Render ClientFieldDriver correctly', () => {
    const driver = {
      id: 1,
      phoneNumber: '094808489',
      firstName: 'Artyom',
      lastName: 'Kosakyan',
      isActive: false,
      isVerifiedByAdmin: false,
    };
    const component = render(<ClientFieldDriver driver={driver} />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('Render ClientFieldPassenger correctly', () => {
    const passenger = {
      id: 1,
      phoneNumber: '094808489',
      firstName: 'Artyom',
      lastName: 'Kosakyan',
    };
    const component = render(<ClientFieldPassenger passenger={passenger} />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
