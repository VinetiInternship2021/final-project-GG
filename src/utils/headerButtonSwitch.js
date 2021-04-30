export const Switch = (button, location) => {
    let path = ''
    switch (button) {
        case 'Login':
            path = '/login'
            break;
        case 'Sign up':
            path = '/signup'
            break;
        case 'Logout':
            path = '/'
            break;
        case 'Home':
            if (location.pathname === '/taxi' ||
                location.pathname === '/client/order' ||
                location.pathname === '/client/history' ||
                location.pathname === '/client/settings'
            ) {
                path = '/client'
            }
            break;
        default:
            path = ''
    }
    return path
}
