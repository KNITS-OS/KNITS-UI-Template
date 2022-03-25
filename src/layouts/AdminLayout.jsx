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
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import careLogo from "assets/img/brand/CareLogoMin.png";

import {
  selectAllCountryData,
  selectAllBusinessUnitData,
  selectAllGroupData,
  selectAllEmployeeData,
  findAllCountries,
  findAllBusinessUnits,
  searchGroups,
  searchEmployees,
} from "redux/features";

import { AdminFooter } from "components/footers";
import { AdminNavbar } from "components/navbars";
import { Sidebar } from "components/sidebar";

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
  const [isEmployeesDataLoaded, setIsEmployeesDataLoaded] = useState(false);

  const countries = useSelector(selectAllCountryData);
  const businessUnits = useSelector(selectAllBusinessUnitData);
  const groups = useSelector(selectAllGroupData);
  const employees = useSelector(selectAllEmployeeData);

  useEffect(() => {
    dispatch(findAllCountries());
    dispatch(findAllBusinessUnits());
    dispatch(searchGroups());
    dispatch(searchEmployees({}));
  }, [dispatch]);

  useEffect(() => {
    if (countries && countries.length > 0) {
      setIsCountryDataLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries]);

  useEffect(() => {
    if (businessUnits && businessUnits.length > 0) {
      setIsBusinessUnitsDataLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessUnits]);

  useEffect(() => {
    if (groups && groups.length > 0) {
      setIsGroupsDataLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  useEffect(() => {
    if (employees && employees.length > 0) {
      setIsEmployeesDataLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employees]);

  useEffect(() => {
    if (
      isCountryDataLoaded &&
      isBusinessUnitsDataLoaded &&
      isGroupsDataLoaded &&
      isEmployeesDataLoaded
    ) {
      setIsDataLoadingCompleted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCountryDataLoaded,
    isBusinessUnitsDataLoaded,
    isGroupsDataLoaded,
    isEmployeesDataLoaded,
    isDataLoadingCompleted,
  ]);

  const getNavbarTheme = () => {
    return location.pathname.indexOf("admin/alternative-dashboard") === -1 ? "dark" : "light";
  };

  return (
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
  );
};
