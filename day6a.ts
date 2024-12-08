import fs from "fs";

try {
  console.time("Execution Time");

  let sum = 1,
    dir = 1, // 1 is up, 2 is down, 3 is left, 4 is right
    pos: number[] = [];

  const data = fs.readFileSync("./day6input.txt", "utf8");

  const room = data.split("\n").map((line, rowIndex) => {
    const splitRow = [];
    for (let colIndex = 0; colIndex < line.length; colIndex++) {
      if (line[colIndex] === "^") {
        pos = [rowIndex, colIndex];
      }
      splitRow.push(line[colIndex]);
    }
    return splitRow;
  });

  let steps = 0;

  while (true) {
    if (canWalk()) {
      walk();
    } else if (willExit()) {
      break;
    } else {
      turn();
    }
    steps++;
  }

  function willExit() {
    if (dir === 1 && pos[0] === 0) return true;
    else if (dir === 2 && pos[0] === room.length - 1) return true;
    else if (dir === 3 && pos[1] === 0) return true;
    else if (dir === 4 && pos[1] === room[0].length - 1) return true;
    else return false;
  }
  function canWalk() {
    if (willExit()) return false;

    const next = nextStep();
    const canTakeNextStep = next === "." || next === "o";
    return canTakeNextStep;
  }
  function nextStep() {
    if (willExit()) return null;

    if (dir === 1) return room[pos[0] - 1][pos[1]];
    else if (dir === 2) return room[pos[0] + 1][pos[1]];
    else if (dir === 3) return room[pos[0]][pos[1] - 1];
    else if (dir === 4) return room[pos[0]][pos[1] + 1];
  }
  function walk() {
    while (canWalk()) {
      room[pos[0]][pos[1]] = "o";
      if (dir === 1) {
        if (room[pos[0] - 1][pos[1]] === ".") sum++;
        pos = [pos[0] - 1, pos[1]];
      } else if (dir === 2) {
        if (room[pos[0] + 1][pos[1]] === ".") sum++;
        pos = [pos[0] + 1, pos[1]];
      } else if (dir === 3) {
        if (room[pos[0]][pos[1] - 1] === ".") sum++;
        pos = [pos[0], pos[1] - 1];
      } else if (dir === 4) {
        if (room[pos[0]][pos[1] + 1] === ".") sum++;
        pos = [pos[0], pos[1] + 1];
      }
      room[pos[0]][pos[1]] = dir.toString();
    }
  }
  function turn() {
    if (dir === 1) dir = 4;
    else if (dir === 4) dir = 2;
    else if (dir === 2) dir = 3;
    else dir = 1;
  }

  console.log("🚀 ~ sum:", sum);
  console.timeEnd("Execution Time");
} catch (err) {
  console.error("Error reading the file:", err);
}

// time taken:
// 1 hour for solving example input
// 1 hour to make video using canvas
