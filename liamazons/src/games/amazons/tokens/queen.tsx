import type { Square as TSquare } from "amazons-game-engine/dist/types";
import { forwardRef } from "react";
import { colorPalette } from "../settings";

const Queen = forwardRef<
  HTMLDivElement,
  {
    square: TSquare;
    team: string;
    size: string;
    onClick: (token: string, id: TSquare) => void;
    initTransform: string;
  }
>((props, ref) => {
  return (
    <div
      ref={ref}
      onClick={() => props.onClick(props.team, props.square)}
      className="absolute z-20 grid place-items-center"
      style={{
        width: props.size,
        height: props.size,
        transform: props.initTransform,
      }}
    >
      <div
        className="absolute w-4/5 h-4/5 rounded-full border border-black"
        style={{ backgroundColor: colorPalette[props.team] }}
      />
      <div className="absolute w-3/5 h-3/5 rounded-full border border-black" />
    </div>
  );
});
Queen.displayName = "Queen";

export { Queen };
