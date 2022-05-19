import { allAuthRoles } from "../utils";

import { VENDORS_PEOPLE_PAGE, VendorsCustomersPage } from ".";

export const vendorsCustomersPage = [
  {
    collapse: false,
    name: "Vendors & Customers",
    path: VENDORS_PEOPLE_PAGE,
    component: <VendorsCustomersPage />,
    icon: "ni ni-circle-08 text-info",
    layout: "/admin",
    key: "VendorsCustomers",
    allowedRoles: [...allAuthRoles],
    sideBarGroup: 3,
  },
];
