import { IRoute } from "types";

import { HOME, HomePage } from ".";

export const homeMenu: IRoute[] = [
  {
    collapse: false,
    global: true,
    path: `${HOME}`,
    component: <HomePage />,
    layout: "/admin",
    name: `${HOME}`,
    key: `Home/${HOME}`,
  },
];
