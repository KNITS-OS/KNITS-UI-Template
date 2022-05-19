import { allAuthRoles } from "../utils";

import { MAINTENANCE_PAGE, MaintenancePage } from ".";

export const maintenancePage = [
  {
    collapse: false,
    name: "Preventive Maintenance",
    path: MAINTENANCE_PAGE,
    component: <MaintenancePage />,
    icon: "ni ni-building text-info",
    layout: "/admin",
    key: "Maintenance",
    allowedRoles: [...allAuthRoles],
    sideBarGroup: 1,
  },
];
