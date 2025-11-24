import clsx from "clsx";
import { Link, useLocation } from "react-router";

export const Menu = ({
  menus,
}: {
  menus: Array<{
    path: string;
    children: string | React.ReactElement;
  }>;
}) => {
  const { pathname } = useLocation();

  return (
    <>
      {menus.map((item) => {
        return (
          <li className="nav-item" key={item.path}>
            <Link
              className={clsx(
                "nav-link",
                pathname === item.path ? "active" : ""
              )}
              to={item.path}
            >
              {item.children}
            </Link>
          </li>
        );
      })}
    </>
  );
};
