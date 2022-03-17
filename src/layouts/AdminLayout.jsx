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
import { useEffect, useRef, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import careLogo from "assets/img/brand/CareLogoMin.png";

import { routes } from "routes";

import {
  selectAllCountryData,
  selectAllBusinessUnitData,
  selectAllGroupsData,
  findAllCountries,
  findAllBusinessUnits,
  findAllGroups,
} from "redux/features";

import { AdminFooter } from "components/footers";
import { AdminNavbar } from "components/navbars";
import { Sidebar } from "components/sidebar";

import { ThemeColors } from "variables/app.consts";

import { useScrollToTop } from ".";

export const AdminLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const mainContentRef = useRef(document.createElement("div"));
  useScrollToTop(mainContentRef);

  const [isDataLoadingCompleted, setIsDataLoadingCompleted] = useState(false);
  const [isCountryDataLoaded, setIsCountryDataLoaded] = useState(false);
  const [isBusinessUnitsDataLoaded, setIsBusinessUnitsDataLoaded] = useState(false);
  const [isGroupsDataLoaded, setIsGroupsDataLoaded] = useState(false);

  const countries = useSelector(selectAllCountryData);
  const businessUnits = useSelector(selectAllBusinessUnitData);
  const groups = useSelector(selectAllGroupsData);

  useEffect(() => {
    if (!countries || countries.length == 0) {
      dispatch(findAllCountries());
    } else {
      setIsCountryDataLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries, isCountryDataLoaded]);

  useEffect(() => {
    if (!businessUnits || businessUnits.length == 0) {
      dispatch(findAllBusinessUnits());
    } else {
      setIsBusinessUnitsDataLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessUnits, isBusinessUnitsDataLoaded]);

  useEffect(() => {
    if (!groups || groups.length == 0) {
      dispatch(findAllGroups());
    } else {
      setIsGroupsDataLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups, isGroupsDataLoaded]);

  useEffect(() => {
    if (isCountryDataLoaded && isBusinessUnitsDataLoaded && isGroupsDataLoaded) {
      setIsDataLoadingCompleted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCountryDataLoaded, isBusinessUnitsDataLoaded, isGroupsDataLoaded, isDataLoadingCompleted]);

  const getNavbarTheme = () => {
    return location.pathname.indexOf("admin/alternative-dashboard") === -1 ? "dark" : "light";
  };

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
            routes={routes}
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
};
