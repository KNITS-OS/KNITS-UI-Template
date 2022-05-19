import { IRoute } from "types";

import { allAuthRoles } from "../utils";

import { CATEGORIES_ROUTE, CategoriesPage } from ".";

export const categoriesPage: IRoute[] = [
  {
    collapse: false,
    name: "Categories",
    path: CATEGORIES_ROUTE,
    component: <CategoriesPage />,
    icon: "ni ni-book-bookmark text-info",
    layout: "/admin",
    key: "Categories",
    allowedRoles: [...allAuthRoles],
    sideBarGroup: 4,
  },
];
