import { redirect, useLoaderData } from "react-router";
import { omitBy } from "lodash-es";

import type { Route } from "../+types/root";
import { useFetcher } from "~/hooks/useFetcher";
import { inputsSchema, type Inputs } from "~/libs/schemas/settings";
import type { components } from "~/consts/schema";
import { destroySession, getSession } from "~/session.server";
import { ErrorMessage } from "~/components/ErrorMessage";
import fetchClient from "~/libs/api";
// import { useUser } from "~/hooks/useUser";
import { userContext } from "~/context/user";

export const loader = ({ context }: Route.LoaderArgs) => {
  const user = context.get(userContext);

  return { user };
};

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { intent, ...updateData } = data;

  switch (intent) {
    case "logout": {
      const session = await getSession(request.headers.get("Cookie"));
      return redirect("/", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }
    case "update": {
      const result = inputsSchema.safeParse(updateData);

      if (!result.success) {
        return {
          fieldErrors: result.error.flatten().fieldErrors,
          formState: updateData,
          errors: undefined,
        };
      }

      const res = await fetchClient.PUT("/user", {
        body: {
          user: omitBy(result.data, (value, key) => {
            if (key === "password" && !value) {
              return true;
            }
            return false;
          }) as components["schemas"]["User"],
        },
      });

      if (res.error) {
        return {
          errors: res.error.errors.body,
          formState: updateData,
        };
      }

      return {
        formState: updateData,
        errors: [],
      };
    }
    default: {
      throw Error("unknown intent" + intent);
    }
  }
}

export default () => {
  const { fetcher, isLoading, errors, formState, fieldErrors } = useFetcher<
    Inputs,
    components["schemas"]["User"]
  >();
  const { user } = useLoaderData<typeof loader>();
  // const user = useUser;

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <ErrorMessage errors={errors} />

            <fetcher.Form method="post">
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    name="image"
                    defaultValue={formState?.image || user?.image}
                  />
                </fieldset>
                <ErrorMessage errors={fieldErrors?.email} />

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    name="username"
                    defaultValue={formState?.username || user?.username}
                  />
                </fieldset>
                <ErrorMessage errors={fieldErrors?.username} />

                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    name="bio"
                    defaultValue={formState?.bio || user?.bio}
                  ></textarea>
                </fieldset>
                <ErrorMessage errors={fieldErrors?.bio} />

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    name="email"
                    defaultValue={formState?.email || user?.email}
                  />
                </fieldset>
                <ErrorMessage errors={fieldErrors?.email} />

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                    name="password"
                    defaultValue={formState?.password || ""}
                  />
                </fieldset>
                <ErrorMessage errors={fieldErrors?.password} />

                <button
                  disabled={isLoading}
                  type="submit"
                  name="intent"
                  value="update"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update Settings
                </button>
              </fieldset>
            </fetcher.Form>
            <hr />
            <fetcher.Form method="post">
              <button
                type="submit"
                name="intent"
                value="logout"
                className="btn btn-outline-danger"
                disabled={isLoading}
              >
                Or click here to logout.
              </button>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
};
