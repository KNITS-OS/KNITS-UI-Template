import { IRoute } from "types";

import { allAuthRoles } from "../utils";

import { PURCHASE_ORDERS_PAGE, PurchaseOrdersPage } from ".";

export const purchaseOrdersPage: IRoute[] = [
  {
    collapse: false,
    name: "Purchase Orders",
    path: PURCHASE_ORDERS_PAGE,
    component: <PurchaseOrdersPage />,
    icon: "ni ni-money-coins text-info",
    layout: "/admin",
    key: "PurchaseOrders",
    allowedRoles: [...allAuthRoles],
    sideBarGroup: 2,
  },
];
