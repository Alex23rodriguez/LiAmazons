import { Piece1 } from "../../../assets/piece1";
import { FC } from "react";
import { colorPalette } from "../settings";

export const SvgToken: FC<{ team?: string }> = (props) => {
  return <Piece1 bgcolor={colorPalette[props.team!]!} />;
};
