import { FC } from "react";
import { colorPalette } from "../settings";
import { SvgToken } from "./svgtoken";

export const Arrow: FC = () => (
  <div
    style={{
      position: "absolute",
      display: "grid",
      placeItems: "center",
      width: "100%",
      height: "100%",
      zIndex: 10,
    }}
  >
    <SvgToken token="x" />
  </div>
);
