import React from "react";
import { Redirect, Route } from "react-router-dom";
function PrivateRoute({ path, Component }) {
  return (
    <Route
      path={path}
      component={() =>
        JSON.parse(localStorage.getItem("user"))?.status ? (
          <Component />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default PrivateRoute;
