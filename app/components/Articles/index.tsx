import { Article } from "~/components/Article";
import { Pagination } from "~/components/Pagination";
import type { components } from "~/consts/schema";


type Article = Omit<components["schemas"]["Article"], "body">

export default ({
  articles,
  page,
  size,
  total,
}: {
  articles?: Article[];
  page: number;
  size: number;
  total: number;
}) => {
  return (
    <>
      {articles?.length ? (
        articles.map((article) => {
          return (
            <Article
              key={article.slug}
              article={article}
            />
          );
        })
      ) : (
        <div className="my-10">No articles</div>
      )}

      <Pagination page={page} size={size} total={total} />
    </>
  );
};