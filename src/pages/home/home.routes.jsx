import { HOME, HomePage } from ".";

export const homeMenu = [
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
