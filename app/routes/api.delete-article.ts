import { redirect, type ActionFunctionArgs } from "react-router";
import fetchClient from "~/libs/api";
import { authMiddleware } from "~/middlewares/auth";
import { checkIsLogin } from "~/session.server";
import type { Route } from "../+types/root";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function action({ request }: ActionFunctionArgs) {
  if (!(await checkIsLogin(request))) {
    return redirect("/login");
  }
  let data = await request.json();
  const { slug } = data as {
    slug: string;
  };

  const params = {
    params: {
      path: {
        slug,
      },
    },
  };

  await fetchClient.DELETE("/articles/{slug}", params);

  return redirect("/");
}

export { loader } from "~/libs/actions";
export { ErrorBoundary } from "~/root";
