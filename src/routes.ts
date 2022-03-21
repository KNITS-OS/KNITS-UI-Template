import { authMenu } from "pages/auth";
import { dashboardMenu } from "pages/dashboards";
import { documentsMenu } from "pages/documents";
import { groupMenu } from "pages/groups";
import { homeMenu } from "pages/home";
import { userMenu } from "pages/users";

import { IRoute } from "types";

export const routes: IRoute[] = [
  ...homeMenu,
  ...userMenu,
  ...groupMenu,
  ...dashboardMenu,
  ...documentsMenu,
  ...authMenu,
];
