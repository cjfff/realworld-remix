export const LoadingButton = ({
  loading,
  children,
  type = "submit",
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  loading?: boolean;
}) => {
  return (
    <button
      className="btn btn-sm btn-primary"
      {...rest}
      type={type}
      disabled={loading || rest.disabled}
    >
      {loading ? "Loading" : children}
    </button>
  );
};
