import clsx from "clsx";
import { Link, useLocation } from "react-router";

export const Tabs = ({
  tabs,
}: {
  tabs: Array<{
    name: string;
    href: string;
  }>;
}) => {
  const { pathname } = useLocation();

  return (
    <ul className="nav nav-pills outline-active">
      {tabs.map((item) => {
        return (
          <li className="nav-item" key={item.name}>
            <Link
              className={clsx("nav-link", {
                active: pathname === item.href,
              })}
              to={item.href}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
