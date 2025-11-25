import { redirect, useSubmit } from 'react-router';
import type { Route } from '../+types/login';
import { useFetcher } from '~/hooks/useFetcher';
import type { Inputs } from '~/libs/schemas/settings';
import type { components } from '~/consts/schema';
import { destroySession, getSession } from '~/session.server';
import { store, userAtom } from '~/store/user';

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  if (data.logout) {
    const session = await getSession(request.headers.get("Cookie"));
    store.set(userAtom, undefined)
    return redirect("/", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  } 
  
  return null;
}

export default () => {
  useFetcher<Inputs, components['schemas']['User']>()
  const submit = useSubmit()
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <ul className="error-messages">
              <li>That name is required</li>
            </ul>

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              onClick={() => {
                const formData = new FormData();
                formData.append("logout", "1");
                submit(formData, { method: "post" });
              }}
              className="btn btn-outline-danger"
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
