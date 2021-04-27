const login_signup = ['Login', 'Sign up'];
const login = ['Login'];
const signup = ['Sign up'];
const logout = ['Logout'];

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
    '/client/order': logout,
    '/client/history': logout,
    '/client/settings': logout,
    '/client/profile': logout,
    '/login/admin': logout
}

export const buttons = ['Client', 'Driver'];