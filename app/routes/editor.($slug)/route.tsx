import fetchClient from "~/libs/api";
import { redirect, useLoaderData, useParams } from "react-router";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useFetcher } from "~/hooks/useFetcher";
import type { components } from "~/consts/schema";
import type { Route } from "../+types/article.$slug";
import { useRef, useState } from "react";
import { inputsSchema } from "~/libs/schemas/newArticle";
import { omitBy } from "lodash-es";
import { authMiddleware } from "~/middlewares/auth";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware as unknown as Route.MiddlewareFunction];

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug;

  if (!slug) {
    return {
      article: null,
    };
  }

  const userRes = await fetchClient.GET("/user");
  const currentUser = userRes.data?.user;
  if (!currentUser) {
    throw redirect("/login");
  }

  const res = await fetchClient.GET("/articles/{slug}", {
    params: {
      path: {
        slug,
      },
    },
  });

  const article = res.data?.article;

  const isAuthor = currentUser?.username === article?.author?.username;

  if (!isAuthor) {
    throw redirect(`/article/${slug}`);
  }

  return {
    article,
    isAuthor,
  };
}

export async function action({ request, params }: Route.ActionArgs) {
  let formData = await request.formData();
  const slug = params.slug;
  const data = Object.fromEntries(formData);
  const { tagList, ...updateData } = data as Omit<
    components["schemas"]["NewArticle"],
    "tagList"
  > & {
    tagList: string;
  };
  const result = inputsSchema.safeParse(
    omitBy(
      {
        ...updateData,
        tagList: tagList?.split(",").filter(Boolean) || "",
      },
      (value) => {
        if (!value) {
          return true;
        }
        return false;
      }
    )
  );

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      formState: updateData,
      errors: undefined,
    };
  }

  const fetchParams = {
    body: {
      article: result.data,
    },
  };

  const res = await(
    slug
      ? fetchClient.PUT("/articles/{slug}", {
          ...fetchParams,
          params: {
            path: {
              slug,
            },
          },
        })
      : fetchClient.POST("/articles", fetchParams)
  );

  if (res.error) {
    return {
      errors: res.error.errors.body,
      formState: updateData,
    };
  }

  return redirect(`/article/${res.data?.article.slug}`);
}

export default () => {
  const { article } = useLoaderData<typeof loader>();
  const { fetcher, isLoading, errors, formState, fieldErrors } =
    useFetcher<components["schemas"]["NewArticle"]>();

  const { slug } = useParams();

  const tagInputRef = useRef<HTMLInputElement>(null);
  const tagListRef = useRef<HTMLInputElement>(null);
  const [tagList, setTagList] = useState<string[]>([]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ErrorMessage errors={errors} />

            <fetcher.Form method="post">
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    name="title"
                    defaultValue={formState?.title || article?.title}
                  />
                </fieldset>
                <ErrorMessage errors={fieldErrors?.title} />
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    name="description"
                    defaultValue={
                      formState?.description || article?.description
                    }
                  />
                </fieldset>
                <ErrorMessage errors={fieldErrors?.description} />
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    name="body"
                    defaultValue={formState?.body || article?.body}
                  ></textarea>
                </fieldset>
                <ErrorMessage errors={fieldErrors?.body} />

                {!slug ? (
                  <fieldset className="form-group">
                    <input
                      ref={tagInputRef}
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      onKeyDown={(e) => {
                        e.stopPropagation();

                        if (e.key === "Enter") {
                          const newTagList = tagList.slice();
                          const value = e.currentTarget.value.trim();

                          if (value && !newTagList.includes(value)) {
                            newTagList.push(value);
                            e.currentTarget.value = "";
                            setTagList(newTagList);
                          }
                          e.preventDefault();
                        }
                      }}
                    />
                    <input
                      ref={tagListRef}
                      type="hidden"
                      name="tagList"
                      value={
                        tagList.length
                          ? tagList.join(",")
                          : formState?.tagList?.join(",")
                      }
                    />
                    <div className="tag-list">
                      <div className="tag-list">
                        {(tagList || []).map((tag) => {
                          return (
                            <span key={tag} className="tag-default tag-pill">
                              <i
                                className="ion-close-round"
                                onClick={() => {
                                  setTagList((list) => {
                                    return list.filter(
                                      (value) => value !== tag
                                    );
                                  });
                                }}
                              ></i>
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </fieldset>
                ) : null}
                <button
                  type="submit"
                  className="btn btn-lg pull-xs-right btn-primary"
                >
                  {isLoading
                    ? "loading"
                    : `${slug ? "Update" : "Publish"} Article`}
                </button>
              </fieldset>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
};
