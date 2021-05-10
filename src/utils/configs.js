export const appRoutes = {
    root: '/',
    signup: '/signup',
    login: '/login',
    signupClient: '/signup/client',
    signupDriver: '/signup/driver',
    loginClient: '/login/client',
    loginDriver: '/login/driver',
    loginAdmin: '/login/admin',
<<<<<<< HEAD
    client: '/client',
    driver: '/driver',
    admin: '/admin',
    taxi: '/taxi',
    clientHistory: '/client/history',
    clientSettings: '/client/settings'
=======
    client: '/passenger/:id',
    driver: '/driver/:id',
    admin: '/admin',
    taxi: '/taxi',
    clientHistory: '/passenger/history',
    clientSettings: '/passenger/settings',
    driverPage: `/driver/:id`,
    driverProfile: '/driver/:id/profile',
    driverSettings: '/driver/:id/settings',
    driverHistory: '/driver/:id/history',
>>>>>>> c85851bb (reservations, core ride sharing functionality)
}

const logintext = 'Login'
const signuptext = 'Sign up'
const logouttext = 'Logout'
const hometext = 'Home'

const login_signup = [logintext, signuptext];
const login = [logintext];
const signup = [signuptext];
const logout = [logouttext];
const home_logout = [hometext, logouttext];
const home = [hometext];

export const headerButtons = {
    [appRoutes.root]: login_signup,
    [appRoutes.signup]: login,
    [appRoutes.login]: signup,
    [appRoutes.signupClient]: login_signup,
    [appRoutes.signupDriver]: login_signup,
    [appRoutes.loginClient]: login_signup,
    [appRoutes.loginDriver]: login_signup,
    [appRoutes.driver]: logout,
    [appRoutes.client]: logout,
    [appRoutes.loginAdmin]: home,
    [appRoutes.admin]: logout,
    [appRoutes.taxi]: home_logout,
    [appRoutes.clientHistory]: logout,
    [appRoutes.clientSettings]: logout
}

export const clientPageItems = ['New order', 'My history', 'Settings']

export const driverPageItems = ['New Order', 'My history', 'Settings', 'Profile']

export const buttons = ['Client', 'Driver'];

export const orderTypes = ['Econom', 'Business', 'First class', 'Cargo van']

export const rating = [1, 2, 3, 4, 5]

