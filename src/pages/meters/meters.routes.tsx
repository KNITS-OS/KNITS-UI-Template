import { IRoute } from "types";

import { allAuthRoles } from "../utils";

import { METERS_PAGE, MetersPage } from ".";

export const metersPage: IRoute[] = [
  {
    collapse: false,
    name: "Meters",
    path: METERS_PAGE,
    component: <MetersPage />,
    icon: "ni ni-user-run text-info",
    layout: "/admin",
    key: "Meters",
    allowedRoles: [...allAuthRoles],
    sideBarGroup: 2,
  },
];
