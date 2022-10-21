import { FC } from "react";
import { colorPalette } from "../settings";

export const ArrowAnim: FC<{
  size: string;
}> = (props) => (
  <div
    id={"arrow-anim"}
    style={{
      position: "absolute",
      zIndex: 10,
      placeItems: "center",
      width: props.size,
      height: props.size,
      // display: 'grid',
      display: "none",
    }}
  >
    <div
      style={{
        position: "absolute",
        width: "50%",
        height: "50%",
        borderRadius: "9999px",
        backgroundColor: colorPalette["arrow"],
      }}
    />
  </div>
);
