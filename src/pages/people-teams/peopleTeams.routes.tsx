import { IRoute } from "types";

import { allAuthRoles } from "../utils";

import { PEOPLE_TEAMS_PAGE, PeopleAndTeamsPage } from ".";

export const peopleTeamsPage: IRoute[] = [
  {
    collapse: false,
    name: "People & Teams",
    path: PEOPLE_TEAMS_PAGE,
    component: <PeopleAndTeamsPage />,
    icon: "ni ni-badge text-info",
    layout: "/admin",
    key: "PeoplesTeams",
    allowedRoles: [...allAuthRoles],
    sideBarGroup: 3,
  },
];
