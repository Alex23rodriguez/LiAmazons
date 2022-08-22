import { Square as TSquare } from "amazons-game-engine/dist/types";
import { FC } from "react";

const colorPalette: { [key: string]: string } = {
  light: "beige",
  dark: "#16a34a",
  w: "white",
  b: "slateblue",
  canMove: "black",
  canMoveShooting: "red",
  arrow: "black",
  light_h: "yellow",
  dark_h: "yellow",
};

export const Square: FC<{
  square: TSquare;
  color: "light" | "dark";
  token: string;
  selected: boolean;
  onClick: (sq: TSquare, token: string) => void;
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
      onClick={() => props.onClick(props.square, props.token)}
    ></div>
  );
};
