import './app.css';

import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { AppLayout } from '../AppLayout/AppLayout';
import { AppRoutes } from '../../routes';
import store from '../../store/store';

const App: React.FunctionComponent = () => (
  <Router>
    <Provider store={store}>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Provider>
  </Router>
);

export default App;
