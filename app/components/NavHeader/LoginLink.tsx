import { Link } from "react-router";
import { useUser } from "~/hooks/useUser";

export const defaultAvatarUrl =
  "https://raw.githubusercontent.com/gothinkster/node-express-realworld-example-app/refs/heads/master/src/assets/images/smiley-cyrus.jpeg";

export const LoginLink = () => {
  const user = useUser();

  return (
    <li className="nav-item">
      <Link className={"nav-link"} to={`/profile/${user?.username}`}>
        <img
          alt={user?.username || "avatar"}
          src={user?.image || defaultAvatarUrl}
          className="user-pic"
        />
        {user?.username}
      </Link>
    </li>
  );
};
