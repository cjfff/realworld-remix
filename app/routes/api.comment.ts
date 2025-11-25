import { redirect, type ActionFunctionArgs } from "react-router";
import fetchClient from "~/libs/api";
import { inputsSchema } from "~/libs/schemas/comment";
import { checkIsLogin } from "~/session.server";

export async function action({ request }: ActionFunctionArgs) {
  if (!(await checkIsLogin(request))) {
    return redirect("/login");
  }
  let data = await request.json();
  const { slug, ...updateData } = data as {
    slug: string;
    body: string;
  };
  const result = inputsSchema.safeParse(updateData);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      formState: updateData,
      errors: undefined,
    };
  }

  const res = await fetchClient.POST("/articles/{slug}/comments", {
    params: {
      path: {
        slug,
      },
    },
    body: {
      comment: result.data,
    },
  });

  if (res.error) {
    return {
      errors: res.error.errors.body,
      formState: updateData,
    };
  }

  return {
    errors: [],
    formState: null,
    fieldErrors: []
  };
}

export { loader } from "~/libs/actions";
export { ErrorBoundary } from "~/root";
