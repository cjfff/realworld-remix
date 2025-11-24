import { Link, redirect } from "react-router";

import type { Route } from "../+types/root";
import { inputsSchema, type Inputs } from "~/libs/schemas/login";
import fetchClient from "~/libs/api";
import { ErrorMessage } from "~/components/ErrorMessage";
import { useFetcher } from "~/hooks/useFetcher";
import type { components } from "~/consts/schema";
import { commitSession, getSession } from "~/session.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    return redirect("/");
  }
}

export async function action({ request }: Route.ActionArgs) {
  const data = Object.fromEntries(await request.formData());
  const result = inputsSchema.safeParse(data);

  if (!result.success) {
    return {
      formState: data,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }
  const res = await fetchClient.POST("/users/login", {
    body: {
      user: result.data,
    },
  });

  if (res.error) {
    return {
      formState: data,
      errors: res.error.errors.body,
    };
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.set("token", res.data?.user.token!);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default () => {
  const { errors, fieldErrors, formState, fetcher } = useFetcher<
    Inputs,
    components["schemas"]["User"]
  >();

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            <ErrorMessage errors={errors} />

            <fetcher.Form method="post">
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  name="email"
                  defaultValue={formState?.email}
                />
              </fieldset>
              <ErrorMessage errors={fieldErrors?.email} />
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  defaultValue={formState?.password}
                />
              </fieldset>
              <ErrorMessage errors={fieldErrors?.password} />

              <button
                disabled={fetcher.state === "loading"}
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
              >
                {fetcher.state === "loading" ? "Loading" : "Sign in"}
              </button>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
};
