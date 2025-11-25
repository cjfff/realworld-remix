import { createCookieSessionStorage, type ActionFunctionArgs } from "react-router";
import { COOKIE_KEY } from "./consts";

type SessionData = {
  token: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: COOKIE_KEY,
        // expires: new Date(Date.now() + 60_000),
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        path: "/",
        sameSite: "lax",
        secrets: [process.env.SESSION_SECRET!],
        secure: true,
      },
    },
  );

export { getSession, commitSession, destroySession };




export const checkIsLogin = async (request: ActionFunctionArgs['request']) => {
  const session = await getSession(request.headers.get("Cookie"));

  return session.has('token')
}
