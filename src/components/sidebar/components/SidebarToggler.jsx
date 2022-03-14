import classnames from "classnames";

import { useAppDispatch, useAppSelector } from "redux/app";
import { toggleSidebar } from "redux/features";

export const SidebarToggler = () => {
  const { isSidebarOpen } = useAppSelector(state => state.sidebar);
  const dispatch = useAppDispatch();
  return (
    <div className="ml-auto sidebar-toggler">
      <div
        className={classnames("sidenav-toggler", {
          active: isSidebarOpen,
        })}
        role="button"
        tabIndex={0}
        // @docs https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md
        onKeyDown={() => dispatch(toggleSidebar())}
        onClick={() => dispatch(toggleSidebar())}
      >
        <div className="sidenav-toggler-inner">
          <i className="sidenav-toggler-line" />
          <i className="sidenav-toggler-line" />
          <i className="sidenav-toggler-line" />
        </div>
      </div>
    </div>
  );
};
