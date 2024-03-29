import Q1 from "../../../assets/piece1";
import Q2 from "../../../assets/queen1";
import Q3 from "../../../assets/queen2";
import Q4 from "../../../assets/piece2";
import A1 from "../../../assets/basic_arrow";
import A2 from "../../../assets/fire1";
import A3 from "../../../assets/arrow1";
import A4 from "../../../assets/arrow2";

import { FC } from "react";
import { colorPalette } from "../settings";

export const SvgToken: FC<{ token: string }> = ({ token }) => {
  if (token === "w" || token === "b")
    return <Q1 bgcolor={colorPalette[token!]!} />;
  else return <A2 />;
};
