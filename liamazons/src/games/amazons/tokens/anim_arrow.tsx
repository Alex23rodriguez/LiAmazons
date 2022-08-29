import { FC } from "react";
import { colorPalette } from "../settings";

export const ArrowAnim: FC<{
  size: string;
  initTransform: string;
}> = (props) => (
  <div
    id={"arrow-anim"}
    className="absolute z-10 grid place-items-center smooth"
    style={{
      width: props.size,
      height: props.size,
      transform: props.initTransform,
    }}
  >
    <div
      className="absolute w-1/2 h-1/2 rounded-full"
      style={{ backgroundColor: colorPalette["arrow"] }}
    />
  </div>
);
