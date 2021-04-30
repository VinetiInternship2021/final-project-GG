import React from 'react'
import { Route, useLocation, Switch } from 'react-router-dom';
import { appRoutes, headerButtons } from '../utils/configs'
import Header from './Header'
import Signup from './Signup'
import Login from './Login'
import ClientSignup from './Client/ClientSignup'
import DriverSignup from './Driver/DriverSignup'
import DriverLogin from './Driver/DriverLogin'
import DriverPage from './Driver/DriverPage'
import DriverProfile from './Driver/DriverProfile'
import ClientLogin from './Client/ClientLogin'
import AdminLogin from './Admin/AdminLogin'
import ClientHistory from './Client/ClientHistory'
import ClientSettings from './Client/ClientSettings'
import ClientOrder from './Client/ClientOrder'
import Taxi from './Client/Taxi'

const AppRoutes = () => {
    const location = useLocation();

    return (
        <div>
            {/*<Header buttons={headerButtons[location.pathname]} />*/}
            <Switch >
                <Route path={appRoutes.signup} exact component={Signup} />
                <Route path={appRoutes.login} exact component={Login} />
                <Route path={appRoutes.signupClient} exact component={ClientSignup} />
                <Route path={appRoutes.signupDriver} exact component={DriverSignup} />
                <Route path={appRoutes.loginDriver} exact component={DriverLogin} />
                <Route path={appRoutes.loginClient} exact component={ClientLogin} />
                <Route path={appRoutes.loginAdmin} exact component={AdminLogin} />
                <Route path={appRoutes.client} exact component={ClientOrder} />
                <Route path={appRoutes.clientHistory} exact component={ClientHistory} />
                <Route path={appRoutes.clientSettings} exact component={ClientSettings} />
                <Route path={appRoutes.taxi} exact component={Taxi} />
                <Route path={appRoutes.driverPage} exact component={DriverPage} />
                <Route path={appRoutes.driverProfile} exact component={DriverProfile} />
            </Switch>
        </div>
    )
}

export default AppRoutes