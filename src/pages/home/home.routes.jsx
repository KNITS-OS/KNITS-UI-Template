import { HOME } from "./home.routes.const";
import { HomePage } from "./HomePage";

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
