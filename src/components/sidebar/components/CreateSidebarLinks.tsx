import classnames from "classnames";
import { NavLink as NavLinkRRD } from "react-router-dom";

import { Collapse, Nav, NavItem, NavLink } from "reactstrap";

import { useSidebar } from "hooks";
import { IRoute } from "types";

import { getViewCollapseInitialState, activeRoute, CollapseType } from "..";

import { RouteIcon } from ".";

interface Props {
  routes: IRoute[];
  collapseState: CollapseType;
  setCollapseState: React.Dispatch<CollapseType>;
}

export const CreateSidebarLinks = ({ routes, collapseState, setCollapseState }: Props) => {
  const { toggleSidebar } = useSidebar();

  /**
   * this is used on mobile devices, when a user navigates
   * the sidebar will autoclose
   */
  const closeSidebar = () => {
    if (window.innerWidth < 1200) {
      toggleSidebar();
    }
  };

  return (
    <>
      {routes
        // only take in routes that aren't global
        .filter(route => !route.global)
        .map(route => {
          // route menus
          if (route.collapse && route.state && route.views) {
            const st: CollapseType = {};

            st[route["state"]] = !collapseState[route.state];

            return (
              <NavItem key={route.key}>
                <NavLink
                  data-toggle="collapse"
                  aria-expanded={collapseState[route.state]}
                  className={classnames({
                    active: getViewCollapseInitialState(route.views, location),
                  })}
                  onClick={e => {
                    e.preventDefault();
                    setCollapseState({ ...collapseState, ...st });
                  }}
                >
                  <RouteIcon route={route} />
                </NavLink>

                <Collapse isOpen={collapseState[route.state]}>
                  <Nav className="nav-sm flex-column">
                    <CreateSidebarLinks
                      routes={route.views}
                      collapseState={collapseState}
                      setCollapseState={setCollapseState}
                    />
                  </Nav>
                </Collapse>
              </NavItem>
            );
            // route menu children
          } else {
            return (
              <NavItem className={activeRoute(route.layout + route.path, location)} key={route.key}>
                <NavLink
                  to={route.layout + route.path}
                  activeClassName=""
                  onClick={() => closeSidebar()}
                  tag={NavLinkRRD}
                >
                  <RouteIcon route={route} />
                </NavLink>
              </NavItem>
            );
          }
        })}
    </>
  );
};
