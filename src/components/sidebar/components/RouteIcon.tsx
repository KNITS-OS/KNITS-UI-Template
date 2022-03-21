import { IRoute } from "types";

interface Props {
  route: IRoute;
}

export const RouteIcon = ({ route }: Props) => {
  return (
    <>
      {route.icon ? (
        <>
          <i className={route.icon} />
          <span className="nav-link-text">{route.name}</span>
        </>
      ) : route.miniName ? (
        <>
          <span className="sidenav-mini-icon">{route.miniName}</span>
          <span className="sidenav-normal"> {route.name} </span>
        </>
      ) : null}
    </>
  );
};
