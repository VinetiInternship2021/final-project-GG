import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import AppRoutes from './AppRoutes';
import { mapStateToProps } from '../redux/actions';
import store from '../redux/store';

const WrappedApp = connect(mapStateToProps)(AppRoutes);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <WrappedApp />
    </BrowserRouter>
  </Provider>
);

export default App;
