import { authMenu } from "pages/auth";
import { homeMenu } from "pages/home";
import { workOrdersMenu } from "pages/work-orders";

import { analyticsPage } from "./pages/analytics";
import { assetsPage } from "./pages/assets";
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

export const routes = [
  ...homeMenu,
  ...workOrdersMenu,
  ...authMenu,
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
