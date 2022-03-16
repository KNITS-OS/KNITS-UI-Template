import { Link } from "react-router-dom";

import { Collapse, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap";

import { routes } from "routes";

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
      <div className="navbar-inner">
        <Collapse navbar isOpen={true}>
          <Nav navbar>
            <CreateSidebarLinks
              routes={routes}
              collapseState={collapseState}
              setCollapseState={setCollapseState}
            />
          </Nav>

          <hr className="my-3" />
          <h6 className="navbar-heading p-0 text-muted">
            <span className="docs-normal">Care Tools</span>
            <span className="docs-mini">CT</span>
          </h6>
          <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink
                href="http://carecards.us.int.kn/carecards/frmMenuMain?source=S"
                target="_blank"
              >
                <i className="ni ni-palette" />
                <span className="nav-link-text">Digital Credit Card</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://connections.mykn.community/communities/service/html/communitystart?communityUuid=ba7a3c5a-23dd-45ad-9527-b12bd39ea32a"
                target="_blank"
              >
                <i className="ni ni-palette" />
                <span className="nav-link-text">Care Global</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://connections.mykn.community/communities/service/html/communitystart?communityUuid=e6415180-c77b-4c50-baf6-f0346e49f86b"
                target="_blank"
              >
                <i className="ni ni-palette" />
                <span className="nav-link-text">Service Actions Trainings</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://connections.mykn.community/communities/service/html/communityoverview?communityUuid=65e6800f-a221-473c-92a9-ba3ab95fa099"
                target="_blank"
              >
                <i className="ni ni-palette" />
                <span className="nav-link-text">Balance+Belonging</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://connections.mykn.community/communities/service/html/communityoverview?communityUuid=7eda766f-0c33-4f62-8fdb-ecb53191ea79"
                target="_blank"
              >
                <i className="ni ni-palette" />
                <span className="nav-link-text">Blue for Green</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#under development" target="_blank">
                <i className="ni ni-palette" />
                <span className="nav-link-text">Customer Feedback Tool</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#to be confirmed" target="_blank">
                <i className="ni ni-palette" />
                <span className="nav-link-text">HR Dashboards integration</span>
              </NavLink>
            </NavItem>
          </Nav>

          <hr className="my-3" />
          <h6 className="navbar-heading p-0 text-muted">
            <span className="docs-normal">Support</span>
            <span className="docs-mini">D</span>
          </h6>
        </Collapse>
      </div>
    </div>
  );
};
