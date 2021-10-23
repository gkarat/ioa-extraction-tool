import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';
import store from '../redux/store';

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
