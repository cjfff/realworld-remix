import clsx from "clsx";
import { useFetcher } from "~/hooks/useFetcher";

export const FavoriteButton = ({
  count = 0,
  text = "Favorite Post",
  slug,
  favorite,
  className,
}: {
  count?: number;
  text?: string;
  slug: string;
  favorite?: boolean;
  className?: string;
}) => {
  const { fetcher, isLoading } = useFetcher();
  return (
    <fetcher.Form
      className={clsx("inline", className)}
      method="post"
      action="/api/favorites"
    >
      <input type="hidden" value={slug} name="slug" />
      <input
        type="hidden"
        value={favorite ? "unfavorite" : "favorite"}
        name="action"
      />
      <button
        disabled={isLoading}
        type="submit"
        className="btn btn-sm btn-outline-primary action-btn"
      >
        <i className={clsx("ion-heart")}></i> {text}{" "}
        <span className="counter">{count || 0}</span>
      </button>
    </fetcher.Form>
  );
};
