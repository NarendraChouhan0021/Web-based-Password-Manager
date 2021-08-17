import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App/App";
import { Provider } from "react-redux";
import reduxStore from "./App/redux_store";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import Loader from "./App/Components/Loader/Loader";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/animate.min.css";
// import "./assets/css/demo.css";

ReactDOM.render(
  <Provider store={reduxStore.store}>
    <PersistGate loading={<Loader />} persistor={reduxStore.persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
