import { ReactChild } from "react";

import { checkAuthorized } from "pages/utils";

import { useAuth } from "context";
import { Permission } from "types";

interface Props {
  children: ReactChild | ReactChild[];
  requires: Permission;
  onUnauthorized?: ReactChild | ReactChild[];
}

export const WithAuthorization = ({ children, onUnauthorized, requires }: Props) => {
  const { user } = useAuth();

  const unauthorizedFragments = onUnauthorized ? onUnauthorized : <></>;
  const hasPermission = checkAuthorized(user.authRole, requires);
  return <>{hasPermission ? children : unauthorizedFragments}</>;
};
