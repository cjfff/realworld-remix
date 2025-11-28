// import { getSessionToken } from "~/session.server";
import type { Route } from "../+types/root";
import { redirect } from "react-router";
import { userContext } from "~/context/user";

export const authMiddleware: Route.MiddlewareFunction = async ({
  context,
}) => {
  const user = context.get(userContext);
  
  if (!user) {
    throw redirect("/login");
  }
};
