export const appRoutes = {
  root: '/',
  signup: '/signup',
  login: '/login',
  taxi: '/taxi',
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
    history: '/passenger/:id/history',
    settings: '/passenger/:id/settings',
    taxi: '/passenger/:id/taxi',
  },
  driver: {
    client: '/driver/:id',
    page: '/driver/:id',
    signup: '/signup/driver',
    login: '/login/driver',
    profile: '/driver/:id/profile',
    history: '/driver/:id/history',
    settings: '/driver/:id/settings',
  },
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

export const buttonTexts = ['Client', 'Driver'];

export const orderTypes = {
  Econom: {
    text: 'Econom',
    icon: 'fas fa-taxi',
  },
  Business: {
    text: 'Business',
    icon: 'fas fa-taxi',
  },
  FirstClass: {
    text: 'First class',
    icon: 'fas fa-taxi',
  },
  Cargo: {
    text: 'Cargo van',
    icon: 'fas fa-taxi',
  },
};

export const rating = [1, 2, 3, 4, 5];

export const baseUrl = 'http://localhost:3000/api/v1';
export const UNVERIFIED_URL = `${baseUrl}/admin/unverified_drivers`;

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

export const DriverPageButtons = {
  History: {
    text: 'My history',
    icon: 'fas fa-history',
  },
  Settings: {
    text: 'Settings',
    icon: 'fas fa-cog',
  },
  Profile: {
    text: 'Profile',
    icon: 'fas fa-user-alt',
  },
};

export const clientPageButtons = {
  New: {
    text: 'New order',
    icon: 'fas fa-taxi',
  },
  History: {
    text: 'My history',
    icon: 'fas fa-history',
  },
  Settings: {
    text: 'Settings',
    icon: 'fas fa-cog',
  },
};

export const AdminPageButtons = {
  Clients: {
    text: 'Clients',
    icon: 'fas fa-users',
  },
  Drivers: {
    text: 'Drivers',
    icon: 'fas fa-taxi',
  },
  Settings: {
    text: 'Settings',
    icon: 'fas fa-cog',
  },
  Profile: {
    text: 'Profile',
    icon: 'fas fa-user-alt',
  },
};

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
