import { Outlet, useLoaderData, useLocation } from "react-router";
import type { Route } from "./+types/_home";
import { useUser } from "~/hooks/useUser";
import { Tabs } from "~/components/Tabs";
import fetchClient from "~/libs/api";
import Tags from "~/components/Tags";

export async function loader({ request }: Route.LoaderArgs) {
  const res = await fetchClient.GET("/tags");

  return {
    tags: res.data?.tags || [],
  };
}

export default function Home() {
  const user = useUser();

  const { tags } = useLoaderData<typeof loader>();
  const { pathname } = useLocation();

  const tabs = [
    {
      name: "Global Feed",
      href: "/",
      show: true,
    },
    {
      name: "Your Feed",
      href: "/feed",
      show: !!user,
    },
  ].filter((item) => item.show);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <Tabs tabs={tabs} />
            </div>

            <Outlet />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags link={pathname === '/'} tags={tags} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
