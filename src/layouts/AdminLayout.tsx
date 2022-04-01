/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Outlet, useLocation } from "react-router-dom";

import careLogo from "assets/img/brand/CareLogoMin.png";

import { useStores } from "mobx/app";

import { AdminFooter } from "components/footers";
import { AdminNavbar } from "components/navbars";
import { Sidebar } from "components/sidebar";

import { ThemeColors } from "variables/app.consts";

import { useScrollToTop } from ".";

export const AdminLayout = observer(() => {
  const { employeeStore, groupStore } = useStores();
  const location = useLocation();

  const mainContentRef = useRef(document.createElement("div"));

  const [isDataLoadingCompleted, setIsDataLoadingCompleted] = useState(false);
  const [isGroupsDataLoaded, setIsGroupsDataLoaded] = useState(false);
  const [isEmployeesDataLoaded, setIsEmployeesDataLoaded] = useState(false);

  useScrollToTop(mainContentRef);

  const getNavbarTheme = () => {
    return location.pathname.indexOf("admin/alternative-dashboard") === -1 ? "dark" : "light";
  };

  useEffect(() =>
    autorun(() => {
      if (!employeeStore.entities || employeeStore.entities.length == 0) {
        employeeStore.searchEmployees({});
      } else {
        setIsEmployeesDataLoaded(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    })
  );

  useEffect(() =>
    autorun(() => {
      if (!groupStore.entities || groupStore.entities.length == 0) {
        groupStore.findGroups();
      } else {
        setIsGroupsDataLoaded(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    })
  );

  useEffect(() => {
    if (isGroupsDataLoaded && isEmployeesDataLoaded) {
      setIsDataLoadingCompleted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGroupsDataLoaded, isEmployeesDataLoaded, isDataLoadingCompleted]);

  return (
    <>
      {!isDataLoadingCompleted ? (
        <>
          <div className="main-content" ref={mainContentRef}>
            <div style={{ height: "300pt" }}>&nbsp;</div>
            <div className="d-flex justify-content-center mb-3">
              <Audio color={ThemeColors.theme.primary} height={160} width={160} />
            </div>
          </div>
        </>
      ) : (
        <>
          <Sidebar
            logo={{
              innerLink: "/",
              imgSrc: careLogo,
              imgAlt: "...",
            }}
            rtlActive={false}
          />
          <div className="main-content" ref={mainContentRef}>
            <AdminNavbar theme={getNavbarTheme()} />
            <Outlet />
            <AdminFooter />
          </div>
        </>
      )}
    </>
  );
});
