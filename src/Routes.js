import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout } from './layouts';

import { Dashboard as DashboardView, Logs as LogsView } from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={LogsView}
        exact
        layout={MainLayout}
        path="/logs"
      />

      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
