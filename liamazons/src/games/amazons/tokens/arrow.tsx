import { FC } from "react";
import { colorPalette } from "../settings";
import { SvgToken } from "./svgtoken";

export const Arrow: FC = () => (
  <div className="absolute grid place-items-center w-full h-full z-10">
    <SvgToken token='x'/>

    {/* <div */}
      {/* className="absolute w-1/2 h-1/2 rounded-full" */}
      {/* style={{ backgroundColor: colorPalette["arrow"] }} */}
    {/* /> */}
  </div>
);
