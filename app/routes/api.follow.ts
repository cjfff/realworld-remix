import { redirect, type ActionFunctionArgs } from "react-router";
import fetchClient from "~/libs/api";
import { checkIsLogin } from "~/session.server";

export async function loader({}: ActionFunctionArgs) {
  throw new Response("Page not found", {
    status: 404,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  if (await checkIsLogin(request)) {
    return redirect("/login");
  }
  let formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { action, username } = data as {
    username: string;
    action: "follow" | "unfollow";
  };

  const params = {
    params: {
      path: {
        username,
      },
    },
  };

  await (action === "follow"
    ? fetchClient.POST("/profiles/{username}/follow", params)
    : fetchClient.DELETE("/profiles/{username}/follow", params));

  return true;
}

export { ErrorBoundary } from "~/root";
