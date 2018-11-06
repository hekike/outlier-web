import React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch
} from "react-router-dom";

import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import WorkloadsPage from "./WorkloadsPage";
import WorkloadsStatusPage from "./WorkloadsStatusPage";

// tslint:disable-next-line
import "bootstrap/dist/css/bootstrap.css";

const AppRouter = () => (
  <Router>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
        <div className="container">
          <ul className="navbar-nav mr-auto">
            {/*
            <li className="nav-item">
              <NavLink
                  exact
                  to="/"
                  activeClassName={'active'}
                  className="nav-link"
              >
                Home
              </NavLink>
            </li>
            */}
            <li className="nav-item">
              <NavLink
                to="/workloads"
                activeClassName={'active'}
                className="nav-link"
              >
                Workloads
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/workloads/" exact component={WorkloadsPage} />
          <Route
            path="/workloads/:name/status"
            component={WorkloadsStatusPage} />
          <Route component={NotFoundPage}/>
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
