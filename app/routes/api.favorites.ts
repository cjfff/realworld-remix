import { redirect, type ActionFunctionArgs } from "react-router";
import fetchClient from "~/libs/api";
import { checkIsLogin } from "~/session.server";


export async function action({ request }: ActionFunctionArgs) {
  if (!await checkIsLogin(request)) {
    return redirect("/login");
  }
  let formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { action, slug } = data as {
    slug: string;
    action: "favorite" | "unfavorite";
  };

  const params = {
    params: {
      path: {
        slug,
      },
    },
  };

  await (action === "favorite"
    ? fetchClient.POST("/articles/{slug}/favorite", params)
    : fetchClient.DELETE("/articles/{slug}/favorite", params));

  return true;
}

export { loader } from "~/libs/actions"
export { ErrorBoundary } from "~/root";
