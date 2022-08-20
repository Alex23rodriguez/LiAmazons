import type { Square as TSquare } from "amazons-game-engine/dist/types";
import type { FC } from "react";

// let queenCount = 1;
export const Queen: FC<{
  square: TSquare;
  team: string;
  size: string;
  onClick: (sq: TSquare, token: string) => void;
}> = (props) => {
  return (
    <div
      onClick={() => props.onClick(props.square, props.team)}
      // id={"queen" + queenCount++}
      className="absolute z-20 grid place-items-center mysmooth"
      style={{
        width: props.size,
        height: props.size,
      }}
    >
      <div
        className="absolute w-4/5 h-4/5 rounded-full border border-black"
        style={{ backgroundColor: props.team === "w" ? "white" : "black" }}
      />
      <div className="absolute w-3/5 h-3/5 rounded-full border border-black" />
    </div>
  );
};
