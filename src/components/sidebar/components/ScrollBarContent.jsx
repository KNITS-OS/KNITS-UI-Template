import { Link } from "react-router-dom";

import { Nav, NavbarBrand } from "reactstrap";

import { routes } from "routes";

import { sidebarLinksGroups } from "../../../variables/app.consts";

import { CreateSidebarLinks, SidebarToggler } from ".";

export const ScrollBarContent = ({ logo, collapseState, setCollapseState }) => {
  let navbarBrandProps;

  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outerLink) {
    navbarBrandProps = {
      href: logo.outerLink,
      target: "_blank",
    };
  }

  return (
    <div className="scrollbar-inner">
      <div className="sidenav-header d-flex align-items-center">
        {logo ? (
          <NavbarBrand {...navbarBrandProps}>
            <img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc} />
          </NavbarBrand>
        ) : null}
        <SidebarToggler />
      </div>
      <div className="navbar-inner d-flex flex-column" style={{ gap: "2rem" }}>
        {sidebarLinksGroups.map((group, index) => (
          <Nav navbar key={"group" + index}>
            <CreateSidebarLinks
              routes={routes.filter(route => route.sideBarGroup === group)}
              collapseState={collapseState}
              setCollapseState={setCollapseState}
            />
          </Nav>
        ))}
      </div>
    </div>
  );
};
