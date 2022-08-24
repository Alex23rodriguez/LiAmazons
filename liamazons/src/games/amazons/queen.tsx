import type { Square as TSquare } from "amazons-game-engine/dist/types";
import { FC, MutableRefObject, RefObject, useRef } from "react";
import { colorPalette } from "./settings";
import { makeTransform } from "./util";

// import { makeTransform } from "./util";
// import { useAutoAnimate } from "@formkit/auto-animate/react";

// let queenCount = 1;
export const Queen: FC<{
  square: TSquare;
  team: string;
  size: string;
  onClick: (token: string, id:number, ref: RefObject<HTMLDivElement>) => void;
  queenId: number;
}> = (props) => {
  console.log("making a queen!");
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onClick={() => props.onClick(props.team, props.queenId, ref)}
      className="absolute z-20 grid place-items-center"
      style={{
        width: props.size,
        height: props.size,
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
