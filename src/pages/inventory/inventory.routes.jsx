import { allAuthRoles } from "../utils";

import { INVENTORY_PAGE, InventoryPage } from ".";

export const inventoryPage = [
  {
    collapse: false,
    name: "Parts/Inventory",
    path: INVENTORY_PAGE,
    component: <InventoryPage />,
    icon: "ni ni-key-25 text-info",
    layout: "/admin",
    key: "Inventory",
    allowedRoles: [...allAuthRoles],
    sideBarGroup: 2,
  },
];
