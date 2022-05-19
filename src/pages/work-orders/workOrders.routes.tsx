import { IRoute } from "types";

import { allAuthRoles } from "../utils";

import { EmployeeDetailsPage, SearchEmployeesPage, WORK_ORDERS, WORK_DETAILS } from ".";

export const workOrdersPage: IRoute[] = [
  {
    collapse: true,
    name: "Work Orders",
    path: WORK_ORDERS,
    component: <SearchEmployeesPage />,
    icon: "ni ni-single-copy-04 text-info",
    layout: "/admin",
    key: "WorkOrders",
    allowedRoles: [...allAuthRoles],
    sideBarGroup: 1,
  },
  {
    collapse: false,
    global: true,
    path: `${WORK_DETAILS}/:id`,
    component: <EmployeeDetailsPage />,
    layout: "/admin",
    name: `${WORK_DETAILS}/:id`,
    key: `work-orders/${WORK_DETAILS}/:id`,
    allowedRoles: [...allAuthRoles],
  },
  // {
  //   collapse: true,
  //   name: "Users",
  //   icon: "ni ni-single-02 text-primary",
  //   state: "usersCollapse",
  //   path: "UsersMenu",
  //   key: "UsersMenu",
  //
  //   views: [
  //     {
  //       path: WORK_ORDERS,
  //       name: "Employees",
  //       miniName: "E",
  //       component: <SearchEmployeesPage />,
  //       layout: "/admin",
  //       key: "Users/Employees",
  //     },
  //   ],
  // },
];
