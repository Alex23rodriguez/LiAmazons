import type { Square as TSquare } from "amazons-game-engine/dist/types";
import { FC, RefObject, forwardRef, ForwardedRef } from "react";
import { colorPalette } from "../settings";

export const Queen = forwardRef<
  HTMLDivElement,
  {
    id: number;
    square: TSquare;
    team: string;
    size: string;
    onClick: (token: string, id: number) => void;
    transformFn: (sq: TSquare) => string;
  }
>((props, ref) => {
  return (
    <div
      ref={ref}
      onClick={() => props.onClick(props.team, props.id)}
      className="absolute z-20 grid place-items-center"
      style={{
        width: props.size,
        height: props.size,
        transform: props.transformFn(props.square),
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
