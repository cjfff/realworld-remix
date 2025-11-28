import { data } from "react-router";

export async function loader() {
  throw data(null, { status: 404 });
}