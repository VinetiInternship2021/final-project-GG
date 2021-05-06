import React from 'react'
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './AppRoutes'
import {connect, Provider} from 'react-redux'
import {mapStateToProps} from '../redux/actions'
import store from '../redux/store'

const WrappedApp = connect(mapStateToProps)(AppRoutes)

const App = () => {
    return (
      <Provider store={store}>
        <BrowserRouter>
            <WrappedApp />
        </BrowserRouter>
      </Provider>
    )
}

export default App