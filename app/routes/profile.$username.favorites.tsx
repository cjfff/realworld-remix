import { useLoaderData, useSearchParams } from "react-router";
import type { Route } from "./+types/profile.$username._index";
import fetchClient from "~/libs/api";
import Articles from "~/components/Articles";

export async function loader({ params, request }: Route.LoaderArgs) {
  const username = params.username;
  const url = new URL(request.url);

  const searchParams = Object.fromEntries(url.searchParams.entries()) as {
    page: string;
    size: string;
  };

  const page = searchParams?.page || 1;
  const size = searchParams?.size || 10;

  const res = await fetchClient.GET("/articles", {
    params: {
      query: {
        limit: Number(size),
        offset: Number(size) * (Number(page) - 1),
        favorited: username,
      },
    },
  });
  return {
    ...res.data,
    page: Number(page),
    size: Number(size),
  };
}

export default () => {
  const {
    page,
    size,
    articlesCount: total = 0,
    articles = [],
  } = useLoaderData<typeof loader>();

  return <Articles total={total} articles={articles} page={page} size={size} />;
};
