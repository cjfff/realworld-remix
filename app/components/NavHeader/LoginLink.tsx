import { useAtom } from "jotai";
import { Link } from "react-router";
import { userAtom } from "~/store/user";

export const defaultAvatarUrl =
  "https://raw.githubusercontent.com/gothinkster/node-express-realworld-example-app/refs/heads/master/src/assets/images/smiley-cyrus.jpeg";

export const LoginLink = () => {
  const [user] = useAtom(userAtom);

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
