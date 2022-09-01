import { square_to_coords } from "amazons-game-engine";
import { Square } from "amazons-game-engine/dist/types";

const animationSpeed = 250; //ms

function makeTransform(sq: Square, amz: any) {
  const { row, col } = amz.square_to_coords(sq);

  const ans = `translate3d(${col === 0 ? "0px" : col + "00%"}, ${
    row === 0 ? "0px" : row + "00%"
  }, 0px)`;
  return ans;
}

export function makeTransformFunction(amz: any) {
  return (sq: Square) => makeTransform(sq, amz);
}

export function makeBasicAnim(el: HTMLDivElement, transformStr: string) {
  el.animate(
    {
      transform: transformStr,
    },
    { duration: animationSpeed, easing: "ease-in-out" }
  ).onfinish = () => {
    el.style.transform = transformStr;
  };
}

export function makeAndRunAnim(
  el: HTMLDivElement,
  sq: Square,
  transformFn: (sq: Square) => string,
  callback: () => void
) {
  const transformStr = transformFn(sq);

  el.animate(
    {
      transform: transformStr,
    },
    {
      duration: animationSpeed,
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
  transformFn: (sq: Square) => string,
  callback: () => void
) {
  const el = document.getElementById("arrow-anim") as HTMLDivElement;
  const transformStrFrom = transformFn(from);
  const transformStrTo = transformFn(to);

  el.style.transform = transformStrFrom;
  el.style.display = "";

  el.animate(
    { transform: transformStrTo },
    {
      duration: animationSpeed,
      easing: "ease-in-out",
    }
  ).onfinish = () => {
    el.style.transform = transformStrTo;
    callback();
    setTimeout(() => (el.style.display = "none"), 100); // TODO: lol temporary solution
  };
}
