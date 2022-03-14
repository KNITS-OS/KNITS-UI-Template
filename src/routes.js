import { authMenu } from "pages/auth";
import { bestPracticesMenu } from "pages/best-practices";
import { dashboardMenu } from "pages/dashboards";
import { groupMenu } from "pages/groups";
import { homeMenu } from "pages/home";
import { userMenu } from "pages/users";

export const routes = [
  ...homeMenu,
  ...userMenu,
  ...groupMenu,
  ...dashboardMenu,
  ...bestPracticesMenu,
  ...authMenu,
];
