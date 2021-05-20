import React from 'react';
import { appRoutes } from '../src/utils/configs';
import {
  configure, shallow,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SettingsHelperFields from '../src/helpers/SettingsHelperFields';
import MenuHelper from '../src/helpers/MenuHelper';

describe('SettingsHelperFields functionality unit-tests', () => {
  const props = {
    state: { isLoading: false },
    fields: { first_name: 'Artyom' },
    setFields: () => {},
    onChange: () => {},
  };
  const component = (prop) => shallow(<SettingsHelperFields {...prop} />);
  configure({ adapter: new Adapter() });

  it('SettingsHelperFields have one Registration form component', () => {
    expect(component(props).find('RegistrationForm')).toHaveLength(1);
  });

  it('SettingsHelperFields have 3 labels if driver is true', () => {
    props.driver = true;
    expect(component(props).find('label')).toHaveLength(3);
  });
});

describe('MenuHelper paths tests', () => {
  it('Admin Settings path should be dynamic', () => {
    const event = {
      currentTarget: {
        getAttribute: () => 'Settings',
      },
    };
    const props = {
      event,
      userId: 1,
      user: appRoutes.admin,
    };
    const path = MenuHelper({ ...props });
    expect(path).toEqual('/SuperUser/1/settings');
  });

  it('Admin Profile path should be dynamic', () => {
    const event = {
      currentTarget: {
        getAttribute: () => 'Profile',
      },
    };
    const props = {
      event,
      userId: 1,
      user: appRoutes.admin,
    };
    const path = MenuHelper({ ...props });
    expect(path).toEqual('/SuperUser/1/profile');
  });

  it('Admin Clients path should be dynamic', () => {
    const event = {
      currentTarget: {
        getAttribute: () => 'Clients',
      },
    };
    const props = {
      event,
      userId: 1,
      user: appRoutes.admin,
    };
    const path = MenuHelper({ ...props });
    expect(path).toEqual('/SuperUser/1/passengers');
  });

  it('Admin Clients path should be dynamic', () => {
    const event = {
      currentTarget: {
        getAttribute: () => 'Clients',
      },
    };
    const props = {
      event,
      userId: 1,
      user: appRoutes.admin,
    };
    const path = MenuHelper({ ...props });
    expect(path).toEqual('/SuperUser/1/passengers');
  });

  it('Admin Default path should be dynamic', () => {
    const event = {
      currentTarget: {
        getAttribute: () => 'Default',
      },
    };
    const props = {
      event,
      userId: 1,
      user: appRoutes.admin,
    };
    const path = MenuHelper({ ...props });
    expect(path).toEqual('#');
  });
});
