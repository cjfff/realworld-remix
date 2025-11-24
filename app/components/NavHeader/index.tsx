import { Link } from "react-router";
import { Menu } from "./Menu";
import { LoginLink } from "./LoginLink";
import { useAtom } from "jotai";
import { userAtom } from "~/store/user";

const menus = [
  { path: "/", children: "Home" },
  { path: "/login", children: "Sign in", login: false },
  { path: "/register", children: "Sign up", login: false },
  {
    path: "/editor",
    children: (
      <>
        <i className="ion-compose"></i>&nbsp;New Article
      </>
    ),
    login: true,
  },
  {
    path: "/settings",
    children: (
      <>
        <i className="ion-gear-a"></i>&nbsp;Settings{" "}
      </>
    ),
    login: true,
  },
];

export const Nav = () => {
  const [user] = useAtom(userAtom);
  const isLogin = !!user

  const menuData = menus.filter((item) => {
    if (isLogin) {
      return item.login || typeof item.login === "undefined";
    }

    return !item.login;
  });

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          {<Menu menus={menuData}></Menu>}
          {isLogin ? <LoginLink /> : null}
        </ul>
      </div>
    </nav>
  );
};
