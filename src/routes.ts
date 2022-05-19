import { homeMenu } from "pages/home";

import { IRoute } from "types";

import { analyticsPage } from "./pages/analytics";
import { assetsPage } from "./pages/assets";
import { authMenu } from "./pages/auth";
import { categoriesPage } from "./pages/categories";
import { filesPage } from "./pages/files";
import { inventoryPage } from "./pages/inventory";
import { locationPage } from "./pages/locations";
import { maintenancePage } from "./pages/maintenance";
import { metersPage } from "./pages/meters";
import { peopleTeamsPage } from "./pages/people-teams";
import { purchaseOrdersPage } from "./pages/purchase-orders";
import { requestPortalPage } from "./pages/request-portal";
import { requestPage } from "./pages/requests";
import { vendorsCustomersPage } from "./pages/vendors-customers";
import { workOrdersPage } from "./pages/work-orders";

export const routes: IRoute[] = [
  ...authMenu,
  ...homeMenu,
  ...workOrdersPage,
  ...maintenancePage,
  ...analyticsPage,
  ...requestPage,
  ...locationPage,
  ...assetsPage,
  ...inventoryPage,
  ...purchaseOrdersPage,
  ...metersPage,
  ...peopleTeamsPage,
  ...vendorsCustomersPage,
  ...categoriesPage,
  ...filesPage,
  ...requestPortalPage,
];
