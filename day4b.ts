import fs from "fs";

try {
  console.time("Execution Time");

  type ObjectWithNestedStringArrays = {
    [key: string]: string[];
  };
  let coords: ObjectWithNestedStringArrays = {
    tlbrXtrbl: [],
    tlbrXbltr: [],
    brtlXtrbl: [],
    brtlXbltr: [],
  };
  let sum = 0;

  const rawData = fs.readFileSync("./day4input.txt", "utf8");
  const data = rawData.split("\n").map((line) => {
    return line.split("");
  });

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const c = data[i][j];
      if (c !== "A") continue;

      const tlbr = isTlbr(i, j, data);
      if (tlbr) {
        if (isTrbl(i, j, data)) {
          coords.tlbrXtrbl.push(i + "," + j);
          sum++;
        } else if (isBltr(i, j, data)) {
          coords.tlbrXbltr.push(i + "," + j);
          sum++;
        }
      }

      const brtl = isBrtl(i, j, data);
      if (brtl) {
        if (isTrbl(i, j, data)) {
          coords.brtlXtrbl.push(i + "," + j);
          sum++;
        } else if (isBltr(i, j, data)) {
          coords.brtlXbltr.push(i + "," + j);
          sum++;
        }
      }
    }
  }

  console.log("🚀 ~ sum:", sum);
  console.log("🚀 ~ coords:", coords);
  console.timeEnd("Execution Time");
} catch (err) {
  console.error("Error reading the file:", err);
}

function isTlbr(i: number, j: number, data: string[][]) {
  try {
    if (data[i - 1][j - 1] === "M" && data[i + 1][j + 1] === "S") return true;
  } catch (e) {}
}

function isTrbl(i: number, j: number, data: string[][]) {
  try {
    if (data[i - 1][j + 1] === "M" && data[i + 1][j - 1] === "S") return true;
  } catch (e) {}
}

function isBltr(i: number, j: number, data: string[][]) {
  try {
    if (data[i + 1][j - 1] === "M" && data[i - 1][j + 1] === "S") return true;
  } catch (e) {}
}

function isBrtl(i: number, j: number, data: string[][]) {
  try {
    if (data[i + 1][j + 1] === "M" && data[i - 1][j - 1] === "S") return true;
  } catch (e) {}
}
