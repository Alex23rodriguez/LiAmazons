import type { Square as TSquare } from "amazons-game-engine/dist/types";
import { FC, MutableRefObject, RefObject, useRef } from "react";
import { colorPalette } from "../settings";

export const Queen: FC<{
  queenId: number;
  square: TSquare;
  team: string;
  size: string;
  onClick: (token: string, id: number, ref: RefObject<HTMLDivElement>) => void;
  initTransform: string;
}> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onClick={() => props.onClick(props.team, props.queenId, ref)}
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
};
