import { Square as TSquare } from "amazons-game-engine/dist/types";
import { FC } from "react";
import { colorPalette } from "../settings";
export const Mover: FC<{ shooting: boolean }> = ({ shooting }) => {
  return (
    <div className="absolute grid place-items-center w-full h-full">
      <div
        className="rounded-full w-1/4 h-1/4 z-10"
        style={{
          opacity: 0.5,
          backgroundColor:
            colorPalette[shooting ? "canMoveShooting" : "canMove"],
        }}
      ></div>
    </div>
  );
};
