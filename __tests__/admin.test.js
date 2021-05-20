import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  configure, shallow, render,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import Login from '../src/components/Login';
import ClientFieldDriver from '../src/components/Admin/ClientFieldDriver';
import ClientFieldPassenger from '../src/components/Admin/ClientFieldPassenger';
import ClientFieldDefault from '../src/components/Admin/ClientFieldDefault';
import store from '../src/redux/store';
import ClientField from '../src/components/Admin/ClientField';

describe('Admin testing sets (loggedOut)', () => {
  configure({ adapter: new Adapter() });
  const wrappedComponent = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );

  const client = 'drivers';
  const usersList = {
    users: [{
      driver: {
        id: '1',
        phoneNumber: '094808489',
        firstName: 'Artyom',
        lastName: 'Kosakyan',
        isActive: false,
        isVerifiedByAdmin: false,
        carLevel: 'econom',
      },
    },
    {
      driver: {
        id: '2',
        phoneNumber: '077808489',
        firstName: 'Artyom',
        lastName: 'Kosakyan',
        isActive: false,
        isVerifiedByAdmin: false,
        carLevel: 'business',
      },
    }],
  };

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

  it('Render ClientFieldDefault correctly', () => {
    const component = render(<ClientFieldDefault />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('Render ClientField correctly', () => {
    const match = {
      params: {
        client: 'Driver',
      },
    };
    const component = <ClientField client={match.params.client} usersList={usersList} />;
    const WrapComponent = shallow(wrappedComponent(component));
    expect(shallowToJson(WrapComponent)).toMatchSnapshot();
  });

  it('Render ClientField Drivers list correctly', () => {
    const mountedComponent = render(
      wrappedComponent({
        children: <ClientField client={client} usersList={usersList} />,
      }),
    );
    expect(mountedComponent.hasClass('list-group')).toEqual(true);
  });

  it('Render ClientFieldDriver unverified driver field correctly', () => {
    const mountedComponent = render(
      wrappedComponent({
        children: <ClientFieldDriver driver={usersList.users[0]} />,
      }),
    );
    expect(mountedComponent.hasClass('list-group-item')).toEqual(true);
  });
});
