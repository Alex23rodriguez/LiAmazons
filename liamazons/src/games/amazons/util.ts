import { square_to_coords } from "amazons-game-engine";
import { Square } from "amazons-game-engine/dist/types";

// TODO: make a type from AmazonsAPI

export function makeTransform(sq: Square, amz: any) {
  const { row, col } = amz.square_to_coords(sq);

  const ans = `translate3d(${col === 0 ? "0" : col + "00%"}, ${
    row === 0 ? "0" : row + "00%"
  }, 0)`;
  return ans;
}

export function makeAndRunAnim(
  el: HTMLDivElement,
  sq: Square,
  amz: any,
  callback: () => void
) {
  const transformStr = makeTransform(sq, amz);

  el.animate(
    {
      transform: transformStr,
    },
    {
      duration: 250,
      easing: "ease-in-out",
    }
  ).onfinish = () => {
    el.style.transform = transformStr;
    callback();
  };
}

export function shootAnim(
  from: Square,
  to: Square,
  amz: any,
  callback: () => void
) {
  const el = document.getElementById("arrow-anim") as HTMLDivElement;
  const transformStrFrom = makeTransform(from, amz);
  const transformStrTo = makeTransform(to, amz);

  el.style.transform = transformStrFrom;
  el.style.display = "";

  el.animate(
    { transform: transformStrTo },
    {
      duration: 250,
      easing: "ease-in-out",
    }
  ).onfinish = () => {
    el.style.transform = transformStrTo;
    callback();
    // el.style.display = "none";
  };
}
