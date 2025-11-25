import { redirect, type ActionFunctionArgs } from "react-router";
import fetchClient from "~/libs/api";
import { checkIsLogin } from "~/session.server";

export async function action({ request }: ActionFunctionArgs) {
  if (!(await checkIsLogin(request))) {
    return redirect("/login");
  }
  let data = await request.json();
  const { slug, id } = data as {
    slug: string;
    id: number
  };

  const params = {
    params: {
      path: {
        slug,
        id
      },
    },
  };

  await fetchClient.DELETE("/articles/{slug}/comments/{id}", params);

  return true
}

export { loader } from "~/libs/actions";
export { ErrorBoundary } from "~/root";
