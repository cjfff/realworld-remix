import dayjs from "dayjs";
import { remark } from "remark";
import html from "remark-html";

import fetchClient from "~/libs/api";
import type { Route } from "./+types/article.$slug";
import { useLoaderData } from "react-router";
import ArticleMeta from "~/components/ArticleDetail/ArticleMeta";
import Comments from "~/components/ArticleDetail/Comments";
import { CommentForm } from "~/components/ArticleDetail/CommentForm";

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug;

  if (!slug) {
    return {
      article: null,
    };
  }

  const [res, commentsRes] = await Promise.all([
    fetchClient.GET("/articles/{slug}", {
      params: {
        path: {
          slug,
        },
      },
    }),
    fetchClient.GET("/articles/{slug}/comments", {
      params: {
        path: {
          slug,
        },
      },
    }),
  ]);

  const article = res.data?.article;
  const comments = commentsRes.data?.comments;

  // parse html
  const processedContent = await remark().use(html).process(article?.body);
  const contentHtml = processedContent.toString();

  return {
    article,
    comments,
    contentHtml,
  };
}

// export async function action({ request, params }: Route.ActionArgs) {
//   let formData = await request.formData();
//   const slug = params.slug;
//   const data = Object.fromEntries(formData);
//   const { tagList, ...updateData } = data as Omit<
//     components["schemas"]["NewArticle"],
//     "tagList"
//   > & {
//     tagList: string;
//   };
//   const result = inputsSchema.safeParse(
//     omitBy(
//       {
//         ...updateData,
//         tagList: tagList?.split(",").filter(Boolean) || "",
//       },
//       (value) => {
//         if (!value) {
//           return true;
//         }
//         return false;
//       }
//     )
//   );

//   if (!result.success) {
//     return {
//       fieldErrors: result.error.flatten().fieldErrors,
//       formState: updateData,
//       errors: undefined,
//     };
//   }

//   const fetchParams = {
//     body: {
//       article: result.data,
//     },
//   };

//   const res = await (slug
//     ? fetchClient.PUT("/articles/{slug}", {
//         ...fetchParams,
//         params: {
//           path: {
//             slug,
//           },
//         },
//       })
//     : fetchClient.POST("/articles", fetchParams));
//   console.log(res, "res");
//   if (res.error) {
//     return {
//       errors: res.error.errors.body,
//       formState: updateData,
//     };
//   }

//   return redirect(`/article/${res.data?.article.slug}`);
// }

export default () => {
  const { article, comments, contentHtml } = useLoaderData<typeof loader>();
  const author = article?.author;
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article?.title}</h1>

          <ArticleMeta article={article!} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <div dangerouslySetInnerHTML={{ __html: contentHtml || "" }}></div>
            <ul className="tag-list">
              {article?.tagList.map((tag) => {
                return (
                  <li key={tag} className="tag-default tag-pill tag-outline">
                    {tag}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article!} />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <CommentForm />

            <Comments comments={comments}></Comments>
          </div>
        </div>
      </div>
    </div>
  );
};
