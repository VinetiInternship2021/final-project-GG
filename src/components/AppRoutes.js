import React, {useEffect, useState} from 'react'
import { Route, useLocation, Switch } from 'react-router-dom';
import { appRoutes } from '../utils/configs'
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
import {userIn} from "../utils/API";
import Loading from "../utils/Loading";
import {ChangeActionLoading,
        ChangeActionLoggedIn} from '../redux/actions'

const AppRoutes = (props) => {
  const location = useLocation();
  
  useEffect(() => {
    userInChecker()
      .then()
  }, [])
  
  const userInChecker = async () => {
    await userIn()
      .then(response => {
        loadingDone()
        if (response.data.user_in) {
          loginStatusChanger({
            'isLoading': false,
            'loggedIn': response.data.user_in,
            'userType': response.data.model_name,
            'userId': response.data.user.id
          })
        } else {
          loginStatusChanger({
            'isLoading': false,
            'loggedIn': false,
            'userType': '',
            'userId': ''
          })
        }
      })
    
  }
  
  const loginStatusChanger = (data) => {
    props.dispatch(ChangeActionLoggedIn(data))
  }
  const loadingDone = () => {
    props.dispatch(ChangeActionLoading(false))
  }
  
  return (
    
    <div>
      {props.appState.isLoading ? <Loading/> :
        <div>
          <Header/>
          <Switch>
            <Route path={appRoutes.signup} exact component={Signup}/>
            <Route path={appRoutes.login} exact component={Login}/>
            <Route path={appRoutes.signupClient} exact component={ClientSignup}/>
            <Route path={appRoutes.signupDriver} exact component={DriverSignup}/>
            <Route path={appRoutes.loginDriver} exact component={DriverLogin}/>
            <Route path={appRoutes.loginClient} exact component={ClientLogin}/>
            <Route path={appRoutes.loginAdmin} exact component={AdminLogin}/>
            <Route path={appRoutes.client} exact component={ClientOrder}/>
            <Route path={appRoutes.clientHistory} exact component={ClientHistory}/>
            <Route path={appRoutes.clientSettings} exact component={ClientSettings}/>
            <Route path={appRoutes.taxi} exact component={Taxi}/>
            <Route path={appRoutes.driverPage} exact component={DriverPage}/>
            <Route path={appRoutes.driverProfile} exact component={DriverProfile}/>
          </Switch>
        </div>
      }
    </div>
  )
}

export default AppRoutes