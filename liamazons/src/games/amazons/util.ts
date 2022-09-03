import { square_to_coords } from "amazons-game-engine";
import { Square as TSquare } from "amazons-game-engine/dist/types";

const animationSpeed = 250; //ms

function makeTransform(sq: TSquare, amz: any) {
  const { row, col } = amz.square_to_coords(sq);

  const ans = `translate3d(${col === 0 ? "0px" : col + "00%"}, ${
    row === 0 ? "0px" : row + "00%"
  }, 0px)`;
  return ans;
}

export function makeTransformFunction(amz: any) {
  return (sq: TSquare) => makeTransform(sq, amz);
}

export function transformQueens(
  pieces: { b: TSquare[]; w: TSquare[] },
  transformFn: (sq: TSquare) => string
) {
  for (const team of ["b", "w"] as ["b", "w"]) {
    pieces[team].forEach((sq, index) => {
      const el = document.getElementById(team + index);
      if (!el) return; //throw "didnt find queeen";

      const correct = transformFn(sq);
      if (el.style.transform !== correct) {
        console.log("-------------");
        console.log(sq, index);
        console.log("animating ", team, index);
        console.log("el.style.transform", el.style.transform);
        console.log("correct", correct);
        console.log(el);
        console.log("-------------");
        el.animate(
          {
            transform: correct,
          },
          { duration: animationSpeed, easing: "ease-in-out" }
        ).onfinish = () => {
          el.style.transform = correct;
        };
      }
    });
  }
}

export function makeAndRunAnim(
  id: string,
  sq: TSquare,
  transformFn: (sq: TSquare) => string,
  callback: () => void
) {
  const el = document.getElementById(id);
  if (!el) throw `Queen with id ${id} not found!`;

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
  from: TSquare,
  to: TSquare,
  transformFn: (sq: TSquare) => string,
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
