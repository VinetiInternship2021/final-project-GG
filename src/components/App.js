import React from 'react'
import Header from './Header'
import Route from './Route'
import Signup from './Signup'
import Login from './Login'
import ClientSignup from './ClientSignup'
import DriverSignup from './DriverSignup'
import DriverLogin from './DriverLogin'
import ClientLogin from './ClientLogin'
import AdminLogin from './AdminLogin'

class App extends React.Component {
    state = {
        path: ''
    }

    obj = {
        '/signup': ['Login'],
        '/login': ['Sign up'],
        '/signup/client': ['Login', 'Sign up'],
        '/signup/driver': ['Login', 'Sign up'],
        '/login/client': ['Login', 'Sign up'],
        '/login/driver': ['Login', 'Sign up'],
        '/driver': ['Logout']
    }

    onPathChange = (path) => {
        this.setState({ path })
    }

    render() {
        return (
            <>
                <Header buttons={this.obj[this.state.path] || ['Login', 'Sign up']} />
                <Route pathChange={this.onPathChange} path='/signup'>
                    <Signup />
                </Route>
                <Route pathChange={this.onPathChange} path='/login'>
                    <Login />
                </Route>
                <Route pathChange={this.onPathChange} path='/signup/client'>
                    <ClientSignup />
                </Route>
                <Route pathChange={this.onPathChange} path='/signup/driver'>
                    <DriverSignup />
                </Route>
                <Route pathChange={this.onPathChange} path='/login/driver'>
                    <DriverLogin />
                </Route>
                <Route pathChange={this.onPathChange} path='/login/client'>
                    <ClientLogin />
                </Route>
                <Route pathChange={this.onPathChange} path='/login/admin'>
                    <AdminLogin />
                </Route>
            </>
        )
    }
}

export default App