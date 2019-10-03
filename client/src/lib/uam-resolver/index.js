import React from "react";
import { Route } from "react-router-dom";
import { uamConstants } from "../../languagepack";
import uamConfig from "./config";
import GenericNotFound from "../../components/atoms/GenericNotFound";

const routesResolver = routes => {
  try {
    const resolvedRoutes = routes.map(route => {
      const currentRoute = Object.keys(route)[0];
      const currentRouteConfig = uamConfig.routesConfig[currentRoute];
      if (route[currentRoute].includes(uamConstants.routes.ENABLE)) {
        return (
          <Route
            exact={currentRouteConfig.exact}
            path={currentRouteConfig.pathname}
            component={currentRouteConfig.component}
          />
        );
      } else {
        return (
          <Route
            exact={true}
            path={currentRouteConfig.pathname}
            component={() => <GenericNotFound statusCode={403} />}
          />
        );
      }
    });
    resolvedRoutes.push(<Route component={() => <GenericNotFound statusCode={404} />} />);
    return resolvedRoutes;
  } catch (error) {
    throw error;
  }
};

const secondaryNavigationList = navigations => {
  try {
    let navigationList = navigations.filter(navigation => {
      let currentNavigation = Object.keys(navigation)[0];
      if (uamConfig.navigationAccessList.includes(currentNavigation)) {
        return navigation;
      }
    });
    return navigationList;
  } catch (error) {
    throw error;
  }
};

const resolveSecondaryNavigation = navigations => {
  try {
    let resolvedNavigations = navigations
      .map(navigation => {
        let currentNavigation = Object.keys(navigation)[0];
        const currentNavigationConfig =
          uamConfig.navigationConfig[currentNavigation];
        if (
          navigation[currentNavigation].includes(uamConstants.navigation.ENABLE)
        ) {
          return currentNavigationConfig;
        }
      })
      .filter(notDefined => notDefined);
    return resolvedNavigations;
  } catch (error) {
    throw error;
  }
};

export default {
  routesResolver,
  secondaryNavigationList,
  resolveSecondaryNavigation
};

