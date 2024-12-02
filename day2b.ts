import fs from "fs";

try {
  console.time("Execution Time");

  let safe = 0;

  const data = fs.readFileSync("./day2input.txt", "utf8");
  const reports = data.split("\n");

  for (let i = 0; i < reports.length; i++) {
    const levelsStr = reports[i].split(" ");
    if (isReportSafe(levelsStr)) safe++;
    else {
      for (let j = 0; j < levelsStr.length; j++) {
        const modLevelsStr = [
          ...levelsStr.slice(0, j),
          ...levelsStr.slice(j + 1, levelsStr.length),
        ];
        if (isReportSafe(modLevelsStr)) {
          safe++;
          break;
        }
      }
    }
  }

  console.log("🚀 ~ reports.forEach ~ safe:", safe);
  console.timeEnd("Execution Time");
} catch (err) {
  console.error("Error reading the file:", err);
}

function isReportSafe(levelsStr: string[]) {
  const min = 1,
    max = 3;

  const levels = [];
  let inc, i;

  for (i = 0; i < levelsStr.length; i++) {
    const level = parseInt(levelsStr[i]);
    levels[i] = level;

    if (i === 0) continue;

    const diff = Math.abs(levels[i] - levels[i - 1]);
    if (diff < min || diff > max) break;

    if (i === 1) {
      inc = levels[1] > levels[0] ? true : false;
    } else if (inc && levels[i - 1] > levels[i]) {
      break;
    } else if (!inc && levels[i - 1] < levels[i]) {
      break;
    }
  }
  return i === levelsStr.length;
}
