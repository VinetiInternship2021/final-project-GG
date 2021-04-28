import React from 'react'
import { Route, useLocation, Switch } from 'react-router-dom';
import { obj } from '../utils/configs'
import Header from './Header'
import Signup from './Signup'
import Login from './Login'
import ClientSignup from './Client/ClientSignup'
import DriverSignup from './Driver/DriverSignup'
import DriverLogin from './Driver/DriverLogin'
import ClientLogin from './Client/ClientLogin'
import AdminLogin from './Admin/AdminLogin'
import ClientPage from './Client/ClientPage'
import ClientProfile from './Client/ClientProfile'
import ClientHistory from './Client/ClientHistory'
import ClientSettings from './Client/ClientSettings'
import ClientOrder from './Client/ClientOrder'
import Taxi from './Client/Taxi'

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
                <Route path='/client/history' exact component={ClientHistory} />
                <Route path='/client/settings' exact component={ClientSettings} />
                <Route path='/client/order' exact component={ClientOrder} />
                <Route path='/taxi' exact component={Taxi} />
            </Switch>
        </div>
    )
}

export default App