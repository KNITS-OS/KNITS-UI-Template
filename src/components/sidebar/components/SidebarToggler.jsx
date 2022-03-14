import classnames from "classnames";

import { useSidebar } from "hooks";

export const SidebarToggler = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="ml-auto sidebar-toggler">
      <div
        className={classnames("sidenav-toggler", {
          active: isSidebarOpen,
        })}
        role="button"
        tabIndex={0}
        // @docs https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md
        onKeyDown={() => toggleSidebar()}
        onClick={() => toggleSidebar()}
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
