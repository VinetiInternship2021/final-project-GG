const login_signup = ['Login', 'Sign up'];
const login = ['Login'];
const signup = ['Sign up'];
const logout = ['Logout'];
const home_logout = ['Home', 'Logout'];

export const obj = {
    '/': login_signup,
    '/signup': login,
    '/login': signup,
    '/signup/client': login_signup,
    '/signup/driver': login_signup,
    '/login/client': login_signup,
    '/login/driver': login_signup,
    '/driver': logout,
    '/client': logout,
    '/login/admin': logout,
    '/admin': logout,
    '/taxi': home_logout,
    '/client/order': home_logout,
    '/client/history': home_logout,
    '/client/settings': home_logout,
    '/client/profile': home_logout
}

export const buttons = ['Client', 'Driver'];

export const orderTypes = ['Econom', 'Business', 'Child seat', '7 seater', 'Cargo van']

export const rating = [1, 2, 3, 4, 5]