import fs from "fs";

try {
  console.time("Execution Time");

  type ObjectWithNestedStringArrays = {
    [key: string]: string[][];
  };
  let coords: ObjectWithNestedStringArrays = {
    hr: [],
    hl: [],
    vd: [],
    vu: [],
    tlbr: [],
    brtl: [],
    trbl: [],
    bltr: [],
  };
  let sum = 0;

  const rawData = fs.readFileSync("./day4input.txt", "utf8");
  const data = rawData.split("\n").map((line) => {
    return line.split("");
  });

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const c = data[i][j];
      if (c !== "X") continue;

      const hr = isHr(i, j, data);
      if (hr) {
        coords.hr.push([i + "," + j, hr]);
        sum++;
      }

      const hl = isHl(i, j, data);
      if (hl) {
        coords.hl.push([i + "," + j, hl]);
        sum++;
      }

      const vd = isVd(i, j, data);
      if (vd) {
        coords.vd.push([i + "," + j, vd]);
        sum++;
      }

      const vu = isVu(i, j, data);
      if (vu) {
        coords.vu.push([i + "," + j, vu]);
        sum++;
      }

      const tlbr = isTlbr(i, j, data);
      if (tlbr) {
        coords.tlbr.push([i + "," + j, tlbr]);
        sum++;
      }

      const brtl = isBrtl(i, j, data);
      if (brtl) {
        coords.brtl.push([i + "," + j, brtl]);
        sum++;
      }

      const trbl = isTrbl(i, j, data);
      if (trbl) {
        coords.trbl.push([i + "," + j, trbl]);
        sum++;
      }

      const bltr = isBltr(i, j, data);
      if (bltr) {
        coords.bltr.push([i + "," + j, bltr]);
        sum++;
      }
    }
  }

  console.log("🚀 ~ sum:", sum);
  console.log("🚀 ~ coords:", coords);
  console.timeEnd("Execution Time");
} catch (err) {
  console.error("Error reading the file:", err);
}

function isHr(i: number, j: number, data: string[][]) {
  if (
    data[i][j + 1] === "M" &&
    data[i][j + 2] === "A" &&
    data[i][j + 3] === "S"
  )
    return i + "," + (j + 3);
}

function isHl(i: number, j: number, data: string[][]) {
  if (
    data[i][j - 1] === "M" &&
    data[i][j - 2] === "A" &&
    data[i][j - 3] === "S"
  )
    return i + "," + (j - 3);
}

function isVd(i: number, j: number, data: string[][]) {
  try {
    if (
      data[i + 1][j] === "M" &&
      data[i + 2][j] === "A" &&
      data[i + 3][j] === "S"
    )
      return `${i + 3},${j}`;
  } catch (e) {}
}

function isVu(i: number, j: number, data: string[][]) {
  try {
    if (
      data[i - 1][j] === "M" &&
      data[i - 2][j] === "A" &&
      data[i - 3][j] === "S"
    )
      return `${i - 3},${j}`;
  } catch (e) {}
}

function isTlbr(i: number, j: number, data: string[][]) {
  try {
    if (
      data[i + 1][j + 1] === "M" &&
      data[i + 2][j + 2] === "A" &&
      data[i + 3][j + 3] === "S"
    )
      return `${i + 3},${j + 3}`;
  } catch (e) {}
}

function isBrtl(i: number, j: number, data: string[][]) {
  try {
    if (
      data[i - 1][j - 1] === "M" &&
      data[i - 2][j - 2] === "A" &&
      data[i - 3][j - 3] === "S"
    )
      return `${i - 3},${j - 3}`;
  } catch (e) {}
}

function isTrbl(i: number, j: number, data: string[][]) {
  try {
    if (
      data[i + 1][j - 1] === "M" &&
      data[i + 2][j - 2] === "A" &&
      data[i + 3][j - 3] === "S"
    )
      return `${i + 3},${j - 3}`;
  } catch (e) {}
}

function isBltr(i: number, j: number, data: string[][]) {
  try {
    if (
      data[i - 1][j + 1] === "M" &&
      data[i - 2][j + 2] === "A" &&
      data[i - 3][j + 3] === "S"
    )
      return `${i - 3},${j + 3}`;
  } catch (e) {}
}
