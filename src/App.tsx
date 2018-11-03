import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import WorkloadsPage from "./WorkloadsPage";
import WorkloadsStatusPage from "./WorkloadsStatusPage";

// tslint:disable-next-line
import "bootstrap/dist/css/bootstrap.css";

const Index = () => <p>Home</p>;
const NoMatch = () => <p>Not Found</p>;

const AppRouter = () => (
  <Router>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
        <div className="container">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/workloads/">Workloads</Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container">
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/workloads/" exact component={WorkloadsPage} />
          <Route
            path="/workloads/:name/status"
            component={WorkloadsStatusPage} />
          <Route component={NoMatch}/>
        </Switch>
      </main>

      <footer className="footer">
        <div className="container pb-2">
          <span className="text-muted">Outlier Istio</span>
        </div>
      </footer>
    </div>
  </Router>
);

export default AppRouter;
