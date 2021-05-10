import React, {useContext} from 'react';
import Context from "../components/context";

export const appRoutes = {
    root: '/',
    signup: '/signup',
    login: '/login',
    signupClient: '/signup/passenger',
    signupDriver: '/signup/driver',
    loginClient: '/login/passenger',
    loginDriver: '/login/driver',
    loginAdmin: '/login/admin',
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
}

const loginText = 'Login'
const signupText = 'Sign up'
const logoutText = 'Logout'
const homeText = 'Home'
const profileText = 'Profile'

export const headerButtons = {
    loggedOut: [homeText, loginText, signupText],
    loggedIn: [homeText, profileText, logoutText]
}

export const clientPageItems = ['New order', 'My history', 'Settings']

export const driverPageItems = ['New Order', 'My history', 'Settings', 'Profile']

export const buttons = ['Client', 'Driver'];

export const orderTypes = ['Econom', 'Business', 'First class', 'Cargo van']

export const rating = [1, 2, 3, 4, 5]

export const baseUrl = 'http://localhost:3000/api/v1'
export const baseReactUrl = 'http://localhost:3001'

export let loginParams = {
    phone_number: '',
    password: '',
    model_name: '',
    remember_me: false,
    alert: ''
}
export let signParams = {
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
    car_registration_number: ''
}

export const DriverPageButtons = [
    'New order',
    'My history',
    'Settings',
    'Profile'
]

export const ClientPageButtons = [
    'New order',
    'My history',
    'Settings',
    'Profile'
]

export const loggedInData = {
    'isLoading': true,
    'loggedIn': false,
    'userType': '',
    'userId': ''
}
