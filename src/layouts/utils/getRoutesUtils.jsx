import { Route } from "react-router-dom";

const getLayout = (route, layout) => {
  if (route.layout === layout && route.component) {
    return <Route path={route.layout + route.path} element={route.component} key={route.key} />;
  } else {
    return null;
  }
};

const getRouteViews = (routes, layout) => {
  return routes.map(route => getLayout(route, layout));
};

export const getRoutes = (routes, layout) => {
  return routes.map(route => {
    if (route.collapse && route.views && route.views.length > 0) {
      return getRouteViews(route.views, layout);
    }

    return getLayout(route, layout);
  });
};
