import { Link, Outlet, useLoaderData } from "react-router";
import type { Route } from "../+types/root";
import fetchClient from "~/libs/api";
import { Avatar } from "../components/Avatar/index";
import { useUser } from "~/hooks/useUser";
import { FollowButton } from "~/components/FollowButton";
import { Tabs } from "~/components/Tabs";

export async function loader({ params }: Route.LoaderArgs) {
  const username = params.username;
  const res = await fetchClient.GET("/profiles/{username}", {
    params: {
      path: {
        username: username!,
      },
    },
  });
  return {
    profile: res.data?.profile,
  };
}

export default () => {
  const { profile } = useLoaderData<typeof loader>();
  const user = useUser();

  const tabs = [
    {
      name: "My Articles",
      href: `/profile/${profile?.username}`,
    },
    {
      name: "Favorited Articles",
      href: `/profile/${profile?.username}/favorites`,
    },
  ];

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <Avatar className="user-img" src={profile?.image} />
              <h4>{profile?.username}</h4>
              <p>{profile?.bio || "There are noting left on the bio"}</p>
              {user?.username !== profile?.username && profile ? (
                <FollowButton profile={profile} />
              ) : null}
              {user ? (
                <>
                  <Link
                    to="/settings"
                    className="btn btn-sm btn-outline-secondary action-btn"
                  >
                    <i className="ion-gear-a"></i>
                    &nbsp; Edit Profile Settings
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <Tabs tabs={tabs} />
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { intent } = data;

  switch (intent) {
    default: {
      throw Error("unknown intent" + intent);
    }
  }
}
