import { allAuthRoles } from "../utils";

import { EmployeeDetailsPage, EMPLOYEE_DETAILS, EMPLOYEE_SEARCH, SearchEmployeesPage } from ".";

export const workOrdersMenu = [
  {
    collapse: true,
    name: "Work Orders",
    path: EMPLOYEE_SEARCH,
    component: <SearchEmployeesPage />,
    icon: "ni ni-single-copy-04 text-info",
    layout: "/admin",
    key: "Users/Employees",
    allowedRoles: [...allAuthRoles],
    sideBarGroup: 1,
  },
  {
    collapse: false,
    global: true,
    path: `${EMPLOYEE_DETAILS}/:id`,
    component: <EmployeeDetailsPage />,
    layout: "/admin",
    name: `${EMPLOYEE_DETAILS}/:id`,
    key: `Users/${EMPLOYEE_DETAILS}/:id`,
    allowedRoles: [...allAuthRoles],
  },
];
