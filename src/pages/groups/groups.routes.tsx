import { IRoute } from "types";

import {
  CreateGroupPage,
  GroupDetailsPage,
  GROUP_DETAILS,
  GROUP_CREATE,
  GROUP_SEARCH,
  SearchGroupsPage,
} from ".";

export const groupMenu: IRoute[] = [
  {
    collapse: true,
    name: "Groups",
    icon: "ni ni-circle-08 text-info",
    state: "groupCollapse",
    path: "GroupsMenu",
    key: "GroupsMenu",

    views: [
      {
        path: GROUP_CREATE,
        name: "Create New",
        miniName: "CN",
        component: <CreateGroupPage />,
        layout: "/admin",
        key: "Groups/Create Group",
      },
      {
        path: GROUP_SEARCH,
        name: "Search",
        miniName: "S",
        component: <SearchGroupsPage />,
        layout: "/admin",
        key: "Groups/Search Group",
      },
    ],
  },
  {
    collapse: false,
    global: true,
    path: `${GROUP_DETAILS}/:id`,
    component: <GroupDetailsPage />,
    layout: "/admin",
    name: `${GROUP_DETAILS}/:id`,
    key: `Groups/${GROUP_DETAILS}/:id`,
  },
];
