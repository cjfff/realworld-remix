import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Nav } from "~/components/NavHeader";
import { Footer } from "~/components/Footer";
import fetchClient from "~/libs/api";
import { destroySession, getSession } from "./session.server";
import { userContext } from "./context/user";

export const middleware: Route.MiddlewareFunction[] = [
  async ({ request, context }) => {

    const session = await getSession(request.headers.get("Cookie"));

    if (session.has("token")) {
      fetchClient.token = session.get("token") || "";
      try {
        const user = await fetchClient.GET("/user");
        context.set(userContext, user.data?.user!);
      } catch (error) {
        fetchClient.token = undefined;
      }
    }
  },
];

export async function loader({ request, context }: Route.LoaderArgs) {
  const user = context.get(userContext);


  if (!user) {
    const session = await getSession(request.headers.get("Cookie"));

    // without token, just return 
    if (!session.has('token')) {
      return { user: undefined };
    }

    // has token but invalid, should be destroied
    return new Response(JSON.stringify({ user: undefined }), {
      status: 200,
      headers: {
        "Content-Type": "applicaiton/json",
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  return { user };
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Conduit</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        <Meta />
        <Links />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App(props: Route.ComponentProps) {
  return  <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;

    console.log(stack, "stack");
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
