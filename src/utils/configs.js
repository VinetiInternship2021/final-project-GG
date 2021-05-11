export const appRoutes = {
  root: '/',
  admin: {
    login: '/login/admin',
    page: '/SuperUser/:id',
    profile: '/SuperUser/:id/profile',
    settings: '/SuperUser/:id/settings',
    clients: '/SuperUser/:id/:client',
  },
  client: {
    client: '/passenger/:id',
    signup: '/signup/passenger',
    login: '/login/passenger',
    history: '#',
    settings: '/passenger/:id/settings',
  },
  driver: {
    client: '/driver/:id',
    page: '/driver/:id',
    signup: '/signup/driver',
    login: '/login/driver',
    profile: '/driver/:id/profile',
    history: '#',
    settings: '/driver/:id/settings',
  },
  signup: '/signup',
  login: '/login',
  clientsList: '/SuperUser/:id/:client',
  taxi: '/taxi',
};

const loginText = 'Login';
const signupText = 'Sign up';
const logoutText = 'Logout';
const homeText = 'Home';
const profileText = 'Profile';

export const headerButtons = {
  loggedOut: [homeText, loginText, signupText],
  loggedIn: [homeText, profileText, logoutText],
};

export const clientPageItems = [
  ['New order', 'fas fa-taxi'],
  ['My history', 'fas fa-history'],
  ['Settings', 'fas fa-cog'],
];

export const buttonTexts = ['Client', 'Driver'];

export const orderTypes = [
  ['Econom', 'fas fa-taxi'],
  ['Business', 'fas fa-taxi'],
  ['Child seat', 'fas fa-taxi'],
  ['7 seater', 'fas fa-taxi'],
  ['Cargo van', 'fas fa-taxi'],
];

export const rating = [1, 2, 3, 4, 5];

export const baseUrl = 'http://localhost:3000/api/v1';
export const baseReactUrl = 'http://localhost:3001';

export const loginParams = {
  phone_number: '',
  password: '',
  model_name: '',
  remember_me: false,
  alert: [],
};
export const signParams = {
  phone_number: '',
  password: '',
  password_confirmation: '',
  first_name: '',
  last_name: '',
  email: '',
  car_manufacturer: '',
  car_model: '',
  car_level: '',
  driver_license_image_id: '',
  car_registration_number: '',
};

export const DriverPageButtons = [
  ['New order', 'fas fa-taxi'],
  ['My history', 'fas fa-history'],
  ['Settings', 'fas fa-cog'],
  ['Profile', 'fas fa-user-alt'],
];

export const AdminPageButtons = [
  ['Clients', 'fas fa-users'],
  ['Drivers', 'fas fa-taxi'],
  ['Drivers history', 'fas fa-history'],
  ['Settings', 'fas fa-cog'],
  ['Profile', 'fas fa-user-alt'],
];

// const buttons = {
//   newOrder: {
//     label: '',
//     className: '',
//   }
// }

export const ClientPageButtons = [
  'New order',
  'My history',
  'Settings',
  'Profile',
];

export const loggedInData = {
  isLoading: true,
  loggedIn: false,
  userType: '',
  userId: '',
};
