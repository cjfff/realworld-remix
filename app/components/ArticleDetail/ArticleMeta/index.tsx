import { DeleteArticle } from "../DeleteArticle";
import { FollowButton } from "~/components/FollowButton";
import { FavoriteButton } from "~/components/FavoriteButton";

import { Avatar } from "~/components/Avatar";
import type { components } from "~/consts/schema";
import { Link } from "react-router";
import { useUser } from "~/hooks/useUser";

export default function ArticleMeta({
  article,
}: {
  article?: components["schemas"]["Article"];
}) {
  const author = article?.author;

  const user = useUser();
  const isAuthor = user?.username === author?.username;

  return (
    <div className="article-meta">
      <Link to={`/profile/${author?.username}`}>
        <Avatar src={author?.image} />
      </Link>
      <div className="info">
        <a href={`/profile/${author?.username}`} className="author">
          {author?.username}
        </a>
        <span className="date">January 20th</span>
      </div>
      {!isAuthor ? <FollowButton profile={author!} /> : null}
      &nbsp;&nbsp;
      <FavoriteButton
        count={article?.favoritesCount}
        slug={article?.slug!}
        favorite={article?.favorited}
      />
      {isAuthor ? (
        <>
          <button className="btn btn-sm btn-outline-secondary">
            <Link to={`/editor/${article?.slug}`}>
              <i className="ion-edit"></i> Edit Article
            </Link>
          </button>
          <DeleteArticle />
        </>
      ) : null}
    </div>
  );
}
