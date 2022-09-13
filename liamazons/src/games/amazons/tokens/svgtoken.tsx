import Q1 from "../../../assets/piece1";
import Q2 from "../../../assets/queen1";
import Q3 from "../../../assets/queen2";
import { FC } from "react";
import { colorPalette } from "../settings";

export const SvgToken: FC<{ team?: string }> = (props) => {
  return <Q1 bgcolor={colorPalette[props.team!]!} />;
};
