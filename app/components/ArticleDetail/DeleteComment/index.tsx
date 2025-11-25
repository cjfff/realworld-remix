import { useParams } from "react-router";
import { useFetcher } from "~/hooks/useFetcher";

export const DeleteComment = ({ id }: { id: number}) => {
  const { slug } = useParams();
  const { fetcher, isLoading, formRef } = useFetcher();
  return (
    <fetcher.Form method="post" className="inline" ref={formRef}>
      <span
        className="mod-options"
        onClick={(e) => {
          if (isLoading) {
            return;
          }
          e.stopPropagation();
          e.preventDefault();
          if (confirm("Are you sure want to delete the comment?")) {
            fetcher.submit(
              {
                slug: slug!,
                id,
              },
              {
                method: "post",
                action: "/api/delete-comment",
                encType: "application/json",
              }
            );
          }
        }}
      >
        <i className="ion-trash-a"></i>
      </span>
    </fetcher.Form>
  );
};
