import { useAppSelector } from "redux/app";
import { selectLoggedUserRole } from "redux/features/authorization/authorization.selectors";
import { checkAuthorized } from "../../pages/utils/utils";

export const WithAuthorization = ({ children, onUnauthorized, requires }) => {
  const currentUserRole = useAppSelector(selectLoggedUserRole);
  const unauthorizedFragments = onUnauthorized ? onUnauthorized : <></>;
  const hasPermission = checkAuthorized(currentUserRole, requires);
  return <>{hasPermission ? children : unauthorizedFragments}</>;
};
