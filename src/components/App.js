import React from 'react'
import { Route, useLocation, Switch } from 'react-router-dom';
import { obj } from '../configs'
import Header from './Header'
import Signup from './Signup'
import Login from './Login'
import ClientSignup from './ClientSignup'
import DriverSignup from './DriverSignup'
import DriverLogin from './DriverLogin'
import ClientLogin from './ClientLogin'
import AdminLogin from './AdminLogin'
import ClientPage from './ClientPage'
import ClientProfile from './ClientProfile'

const App = () => {
    const location = useLocation();

    return (
        <div>
            <Header buttons={obj[location.pathname]} />
            <Switch >
                <Route path='/signup' exact component={Signup} />
                <Route path='/login' exact component={Login} />
                <Route path='/signup/client' exact component={ClientSignup} />
                <Route path='/signup/driver' exact component={DriverSignup} />
                <Route path='/login/driver' exact component={DriverLogin} />
                <Route path='/login/client' exact component={ClientLogin} />
                <Route path='/login/admin' exact component={AdminLogin} />
                <Route path='/client' exact component={ClientPage} />
                <Route path='/client/profile' exact component={ClientProfile} />
            </Switch>
        </div>
    )
}

export default App