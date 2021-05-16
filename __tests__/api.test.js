import {
  userIn, modelShow, getUser, login, logout,
} from '../src/utils/API';
import { loginParams } from '../src/utils/configs';

describe('API testing', () => {
  beforeAll(() => {
    logout();
  });
  it('user_in method -->> returns constant data-body when logged out', () => {
    const responseKeys = {
      loggedIn: ['user_in',
        'model_name',
        'user',
      ],
      loggedOut: ['user_in'],
    };
    userIn()
      .then((resp) => {
        expect(Object.keys(resp.data)).toEqual(expect.arrayContaining(responseKeys.loggedOut));
      });
  });

  it('modelShow -->> returns constant data-body when logged out', () => {
    const responseKeys = {
      loggedIn: ['user_in',
        'model_name',
        'user',
      ],
      loggedOut: ['user_in'],
    };
    const params = {
      model: 'Passenger',
      userId: 1,
    };
    modelShow(params)
      .then((resp) => {
        expect(Object.keys(resp.data)).toEqual(expect.arrayContaining(responseKeys.loggedOut));
      });
  });

  it('getUser -->> returns constant data-body when logged out', () => {
    const responseKeys = {
      loggedIn: ['user_in',
        'model_name',
        'user',
      ],
      loggedOut: ['user_in'],
    };
    getUser('passengers')
      .then((resp) => {
        expect(Object.keys(resp.data)).toEqual(expect.arrayContaining(responseKeys.loggedIn));
      })
      .catch((resp) => {
        expect(Object.keys(resp.data)).toEqual(expect.arrayContaining(responseKeys.loggedOut));
      });
  });
});

describe('API testing, login', () => {
  it('login -->> response when login is :ok and :failed', () => {
    const responseKeys = {
      loggedIn: [
        'login',
        'model_name',
        'user',
      ],
      failed: [
        'message',
        'login'],
    };

    const params = loginParams;
    params.phone_number = '094808489';
    params.password = '123456789';
    params.model_name = 'Driver';

    login(params)
      .then((resp) => {
        expect(Object.keys(resp.data)).toEqual(expect.arrayContaining(responseKeys.loggedIn));
      })
      .catch((resp) => {
        expect(Object.keys(resp.data)).toEqual(expect.arrayContaining(responseKeys.failed));
      });
  });
});

describe('API testing, logged in', () => {
  beforeAll(() => {
    const params = loginParams;
    params.phone_number = '094808489';
    params.password = '123456789';
    params.model_name = 'Driver';

    login(params);
  });
  it('user_in method -->> returns constant data-body when logged out', () => {
    const responseKeys = {
      loggedIn: ['user_in',
        'model_name',
        'user',
      ],
      loggedOut: ['user_in'],
    };
    userIn()
      .then((resp) => {
        expect(Object.keys(resp.data)).toEqual(expect.arrayContaining(responseKeys.loggedOut));
      });
  });

  it('modelShow -->> returns constant data-body when logged out', () => {
    const responseKeys = {
      loggedIn: ['user_in',
        'model_name',
        'user',
      ],
      loggedOut: ['user_in'],
    };
    const params = {
      model: 'Passenger',
      userId: 1,
    };
    modelShow(params)
      .then((resp) => {
        expect(Object.keys(resp.data)).toEqual(expect.arrayContaining(responseKeys.loggedOut));
      });
  });

  it('getUser -->> returns constant data-body when logged out', () => {
    const responseKeys = {
      loggedIn: ['user_in',
        'model_name',
        'user',
      ],
      loggedOut: ['user_in'],
    };
    getUser('passengers')
      .then((resp) => {
        expect(Object.keys(resp.data)).toEqual(expect.arrayContaining(responseKeys.loggedIn));
      })
      .catch((resp) => {
        expect(Object.keys(resp.data)).toEqual(expect.arrayContaining(responseKeys.loggedOut));
      });
  });
});
