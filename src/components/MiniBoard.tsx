import { FEN } from "amazons-game-engine/dist/types";
import { Amazons } from "amazons-game-engine";
import { FC } from "react";
import { colorPalette } from "../games/amazons/settings";
import { SvgToken } from "../games/amazons/tokens/svgtoken";

const Square: FC<{ color: "light" | "dark"; token: string }> = ({
  color,
  token,
}) => {
  return (
    <div
      className="relative"
      style={{ paddingBottom: "100%", backgroundColor: colorPalette[color] }}
    >
      {token === "w" || token == "b" ? (
        <div className="absolute grid place-items-center w-full h-full">
          <SvgToken token={token} />
        </div>
      ) : (
        token === "x" && (
          <div className="absolute grid place-items-center w-full h-full">
            <SvgToken token="x" />
          </div>
        )
      )}
    </div>
  );
};

export const MiniBoard: FC<{
  layout: string;
  width: string;
}> = ({ layout, width }) => {
  const fen = (layout + " w - 1") as FEN;

  const amz = new Amazons(fen);
  const pieces = amz.pieces();
  const { rows, cols } = amz.size();

  return (
    <div className={`grid grid-cols-${cols}`} style={{ width }}>
      {Array.from({ length: rows * cols }, (_, i) => {
        const sq = amz.index_to_square(i);
        return (
          <Square
            color={amz.square_color(sq)}
            token={
              pieces.w.includes(sq)
                ? "w"
                : pieces.b.includes(sq)
                ? "b"
                : pieces.x.includes(sq)
                ? "x"
                : ""
            }
          />
        );
      })}
    </div>
  );
};
