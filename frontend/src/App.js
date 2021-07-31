import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import StartComponent from "./components/StartComponent";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";
import { CarsComponent } from "./components/CarsComponent";
import { NewCar } from "./components/NewCar";
function App() {
  return (
    <div className="App">
      <div style={{ marginTop: "3rem" }} />
      <Router>
        <Route exact path="/" component={StartComponent} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/signup" component={SignUpComponent} />
        <PrivateRoute path="/cars" Component={CarsComponent} />
        <PrivateRoute path="/newcar" Component={NewCar} />

      </Router>
    </div>
  );
}

export default App;
