import { IRoute } from "types";

import { allAuthRoles } from "../utils";

import { LOCATIONS_PAGE, LocationsPage } from ".";

export const locationPage: IRoute[] = [
  {
    collapse: false,
    name: "Locations",
    path: LOCATIONS_PAGE,
    component: <LocationsPage />,
    icon: "ni ni-square-pin text-info",
    layout: "/admin",
    key: "Locations",
    allowedRoles: [...allAuthRoles],
    sideBarGroup: 2,
  },
];
