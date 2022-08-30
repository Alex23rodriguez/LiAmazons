import { FC } from "react";
import { colorPalette } from "../settings";

export const ArrowAnim: FC<{
  size: string;
}> = (props) => (
  <div
    id={"arrow-anim"}
    className="absolute z-10 grid place-items-center smooth"
    style={{
      width: props.size,
      height: props.size,
      display: "none",
    }}
  >
    <div
      className="absolute w-1/2 h-1/2 rounded-full"
      style={{ backgroundColor: colorPalette["arrow"] }}
    />
  </div>
);
