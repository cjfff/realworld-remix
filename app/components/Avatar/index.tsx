import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import { defaultAvatarUrl } from "../NavHeader/LoginLink";

export const Avatar = ({
  src,
  ...args
}:DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  return <img src={src || defaultAvatarUrl} {...args} />;
};
