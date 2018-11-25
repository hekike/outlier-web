import React, { ReactChildren } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import WorkloadsPage from "./pages/WorkloadsPage";
import WorkloadsStatusPage from "./pages/WorkloadsStatusPage";

// tslint:disable-next-line
// import "bootstrap/dist/css/bootstrap.css";
// tslint:disable-next-line
import "bootstrap/dist/css/bootstrap.min.css";

// tslint:disable-next-line
const Breadcrumbs = require('react-router-dynamic-breadcrumbs').default;

function BreadcrumbWrapper(props: { children: ReactChildren }) {
  return <ol className="breadcrumb" >{props.children}</ol>;
}

function BreadcrumbLinkComponent(props: { children: ReactChildren }) {
  return <li className="breadcrumb-item">{props.children}</li>;
}

function BreadcrumbAvtiveLinkComponent(props: { children: ReactChildren }) {
  return <li className="breadcrumb-item active">{props.children}</li>;
}

const routes = {
  '/workloads': 'workloads',
  '/workloads/:name/status': 'status'
};

const AppRouter = () => (
  <Router>
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded">
        <div className="container">
          <NavLink className="navbar-brand" to="/">Outlier</NavLink>
          <ul className="navbar-nav mr-auto">
            {/*
            <li className="nav-item">
              <NavLink
                  exact
                  to="/"
                  activeClassName={'active'}
                  className="nav-link"
              >
                home
              </NavLink>
            </li>
            */}
            <li className="nav-item">
              <NavLink
                to="/workloads"
                activeClassName={'active'}
                className="nav-link"
              >
                workloads
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-2">
        <nav aria-label="breadcrumb">
          <Breadcrumbs
            WrapperComponent={BreadcrumbWrapper}
            ActiveLinkComponent={BreadcrumbAvtiveLinkComponent}
            LinkComponent={BreadcrumbLinkComponent}
            mappedRoutes={routes} />
        </nav>
      </div>

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/workloads" exact component={WorkloadsPage} />
        <Route
          path="/workloads/:name"
          exact
          component={WorkloadsStatusPage} />
        <Route component={NotFoundPage}/>
      </Switch>

      <footer className="footer">
        <div className="container pb-2">
          <span className="text-muted">Outlier Istio</span>
        </div>
      </footer>
    </div>
  </Router>
);

export default AppRouter;
