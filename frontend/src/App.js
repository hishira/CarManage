import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import StartComponent from "./components/StartComponent";
import LoginComponent from "./components/LoginComponent";
function App() {
  return (
    <div className="App">
      <div style={{ marginTop: "3rem"}} />
      <Router>
        <Route exact path="/" component={StartComponent} />
        <Route path="/login" component={LoginComponent} />
      </Router>
    </div>
  );
}

export default App;
