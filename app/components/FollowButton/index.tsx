import type { components } from "~/consts/schema";
import { useFetcher } from "~/hooks/useFetcher";

export const FollowButton = ({
  profile,
}: {
  profile: components["schemas"]["Profile"];
}) => {
  const { fetcher, isLoading } = useFetcher();
  return (
    <fetcher.Form method="post" action="/api/follow">
      <input
        type="hidden"
        name="username"
        value={profile?.username}
      />
      <input
        type="hidden"
        name="action"
        value={profile?.following ? "unfollow" : "follow"}
      />
      <button
        disabled={isLoading}
        type="submit"
        className="btn btn-sm btn-outline-secondary action-btn"
      >
        <i className="ion-plus-round"></i>
        &nbsp; {profile?.following ? "UnFollow" : "Follow"} {profile?.username}
      </button>
    </fetcher.Form>
  );
};
