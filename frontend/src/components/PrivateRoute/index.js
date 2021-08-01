import React from "react";
import { Redirect, Route } from "react-router-dom";
import {getUserActive} from "../../utils/localstorage"
function PrivateRoute({ path, Component }) {
  return (
    <Route
      path={path}
      component={() =>
        getUserActive() ? (
          <Component />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default PrivateRoute;
