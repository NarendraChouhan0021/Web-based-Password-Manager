import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import history from "../history";
import LandingPage from "../Components/Landingpage/LandingPage";
import GeneratePassword from "../Components/GeneratePassword/GeneratePassword";
import EditPassword from "../Components/EditPassword/EditPassword";

const PublicRoutes = (props) => {
  return (
    <Switch>
      <Route
        exact
        path="/wpm"
        render={() => <LandingPage {...props} history={history} />}
      />

      <Route
        exact
        path="/generate-password"
        render={() => <GeneratePassword {...props} history={history} />}
      />

      <Route
        exact
        path="/edit-password"
        render={() => <EditPassword {...props} history={history} />}
      />

      <Route render={() => <Redirect to="/wpm" {...props} />} />
    </Switch>
  );
};
export default withRouter(PublicRoutes);
