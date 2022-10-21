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
      style={{
        position: "relative",
        paddingBottom: "100%",
        backgroundColor: colorPalette[color],
      }}
    >
      {token === "w" || token == "b" ? (
        <div
          style={{
            position: "absolute",
            display: "grid",
            placeItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <SvgToken token={token} />
        </div>
      ) : (
        token === "x" && (
          <div
            style={{
              position: "absolute",
              display: "grid",
              placeItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
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
  const fen = (layout.includes(" ") ? layout : layout + " w - 1") as FEN;

  const amz = new Amazons(fen);
  const pieces = amz.pieces();
  const { rows, cols } = amz.size();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        width,
      }}
    >
      {Array.from({ length: rows * cols }, (_, i) => {
        const sq = amz.index_to_square(i);
        return (
          <Square
            key={sq}
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
