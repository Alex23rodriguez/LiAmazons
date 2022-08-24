import { Square as TSquare } from "amazons-game-engine/dist/types";
import { FC } from "react";
import { colorPalette } from "./settings";

export const Square: FC<{
  square: TSquare;
  color: "light" | "dark";
  token: string;
  selected: boolean;
  onClick: (token: string, sq:TSquare) => void;
}> = (props) => {
  const color = () => {
    let key = props.color;
    if (props.selected) key += "_h";
    return colorPalette[key];
  };

  return (
    <div
      id={props.square}
      className="relative w-full"
      style={{ paddingBottom: "100%", backgroundColor: color() }}
      onClick={() => props.onClick(props.token,props.square, )}
    ></div>
  );
};
