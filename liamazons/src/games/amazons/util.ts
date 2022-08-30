import { square_to_coords } from "amazons-game-engine";
import { Size, Square } from "amazons-game-engine/dist/types";

export function makeTransform(sq: Square, size: Size) {
  const { row, col } = square_to_coords(sq, size);

  const ans = `translate3d(${col === 0 ? "0" : col + "00%"}, ${
    row === 0 ? "0" : row + "00%"
  }, 0)`;
  return ans;
}

export function makeAndRunAnim(
  el: HTMLDivElement,
  sq: Square,
  size: Size,
  callback: () => void
) {
  const transformStr = makeTransform(sq, size);

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
  size: Size,
  callback: () => void
) {
  const el = document.getElementById("arrow-anim") as HTMLDivElement;
  const transformStrFrom = makeTransform(from, size);
  const transformStrTo = makeTransform(to, size);

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
