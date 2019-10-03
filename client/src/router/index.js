import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Layout from "../Layout";

import config from "../config";
import httpClient from "../lib/httpClient";
import uamResolver from "../lib/uam-resolver";
import Loader from "../components/atoms/DotLoader";
import GenericNotFound from "../components/atoms/GenericNotFound";


class Routes extends Component {
  state = {
    resolvedRoutes: null,
    loaderStatus: false,
    errorStatus: false,
    errorCode: null
  };

  async componentWillMount() {
    this.setState({
      loaderStatus: true
    });
    try {
      const response = await httpClient.get(config.endPoints.uamEndPoint);
      if (response.length > 0 && response[0].resources.route && response[0].resources.route.length > 0) {
        const {
          resources: { route }
        } = response[0];
        let secondaryNavigationList = uamResolver.secondaryNavigationList(
          route
        );
        this.setState({
          secondaryNavigationList
        });
        const resolvedRoutes = uamResolver.routesResolver(route);
    
        const withParentComponents = this._resolvedRoutes(resolvedRoutes);
        this.setState({
          resolvedRoutes: withParentComponents,
          loaderStatus: false
        });
      } else {
        window.location.assign(config.redirect.unauthorized);
      }
    } catch (error) {
        this.setState({
          errorStatus: true,
          errorCode: error.code,
          loaderStatus: false
        });
    }
  }

  _resolvedRoutes = routes => {
    return (
      <Layout secondaryNavigationList={this.state.secondaryNavigationList}>
        <Switch>{routes}</Switch>
      </Layout>
    );
  };

  render() {
    const {
      resolvedRoutes,
      loaderStatus,
      errorStatus,
      errorCode
    } = this.state;
    return (

      <Fragment>
        {loaderStatus ? (
          <Loader />
        ) : errorStatus ? (
          <GenericNotFound statusCode={errorCode} />
        ) : (
              <Router>
                {resolvedRoutes}
              </Router>
            )}
      </Fragment>
    );
  }
}

export default Routes;
