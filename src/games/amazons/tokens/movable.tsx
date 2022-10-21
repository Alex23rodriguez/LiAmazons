import { FC } from "react";
import { colorPalette } from "../settings";
export const Mover: FC<{ shooting: boolean }> = ({ shooting }) => {
  return (
    <div
      style={{
        position: "absolute",
        display: "grid",
        placeItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          borderRadius: "9999px",
          width: "25%",
          height: "25%",
          zIndex: 10,
          opacity: 0.5,
          backgroundColor:
            colorPalette[shooting ? "canMoveShooting" : "canMove"],
        }}
      ></div>
    </div>
  );
};
