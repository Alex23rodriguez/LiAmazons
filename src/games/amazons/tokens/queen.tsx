import type { Square as TSquare } from "amazons-game-engine/dist/types";
import { forwardRef } from "react";
import { colorPalette } from "../settings";
import { SvgToken } from "./svgtoken";

const Queen = forwardRef<
  HTMLDivElement,
  {
    square: TSquare;
    team: string;
    size: string;
    onClick: (token: string, id: TSquare) => void;
  }
>((props, ref) => {
  return (
    <div
      ref={ref}
      onClick={() => props.onClick(props.team, props.square)}
      style={{
        position: "absolute",
        zIndex: 20,
        display: "gird",
        placeItems: "center",
        width: props.size,
        height: props.size,
      }}
    >
      <SvgToken token={props.team} />
      {/*   <div */}
      {/*     className="absolute w-4/5 h-4/5 rounded-full border border-black" */}
      {/*     style={{ backgroundColor: colorPalette[props.team] }} */}
      {/*   /> */}
      {/*   <div className="absolute w-3/5 h-3/5 rounded-full border border-black" /> */}
    </div>
  );
});
Queen.displayName = "Queen";

export { Queen };
