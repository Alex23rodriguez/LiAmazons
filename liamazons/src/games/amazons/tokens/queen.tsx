import type { Square as TSquare } from "amazons-game-engine/dist/types";
import { FC, MutableRefObject, RefObject, useRef } from "react";
import { colorPalette } from "../settings";

export const Queen: FC<{
  square: TSquare;
  team: string;
  size: string;
  onClick: (token: string, sq: TSquare, ref: RefObject<HTMLDivElement>) => void;
  transformFn: (sq: TSquare) => string;
}> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onClick={() => props.onClick(props.team, props.square, ref)}
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
};
