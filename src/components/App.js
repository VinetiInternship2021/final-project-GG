import React from 'react'
import Header from './Header'
import Route from './Route'
import Signup from './Signup'
import Login from './Login'
import ClientSignup from './ClientSignup'
import DriverSignup from './DriverSignup'

class App extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Route path='/signup'>
                    <Signup />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/signup/client'>
                    <ClientSignup />
                </Route>
                <Route path='/signup/driver'>
                    <DriverSignup />
                </Route>
            </>
        )
    }
}

export default App