import React, { Suspense, Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Routes from "./AppRoutes";
import "../assets/icon.css";
import "../assets/icon_new.css";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";
import Loader from "../App/Components/Loader/Loader";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ConnectedRouter history={history}>
          <Suspense fallback={<Loader />}>
            <Routes />
          </Suspense>
        </ConnectedRouter>
      </React.Fragment>
    );
  }
}

export default withTranslation()(connect(null, null)(App));
