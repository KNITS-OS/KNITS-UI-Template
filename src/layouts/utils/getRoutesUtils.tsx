import { Route } from "react-router-dom";

import { IRoute, LayoutType } from "types";

const getLayout = (route: IRoute, layout: LayoutType) => {
  if (route.layout === layout && route.component) {
    return <Route path={route.layout + route.path} element={route.component} key={route.key} />;
  } else {
    return null;
  }
};

const getRouteViews = (routes: IRoute[], layout: LayoutType) => {
  return routes.map(route => getLayout(route, layout));
};

export const getRoutes = (routes: IRoute[], layout: LayoutType) => {
  return routes.map(route => {
    if (route.collapse && route.views && route.views.length > 0) {
      return getRouteViews(route.views, layout);
    }

    return getLayout(route, layout);
  });
};
