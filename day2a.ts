import fs from "fs";

try {
  console.time("Execution Time");

  let safe = 0;

  const data = fs.readFileSync("./day2input.txt", "utf8");
  const reports = data.split("\n");

  for (let i = 0; i < reports.length; i++) {
    if (isReportSafe(reports[i])) safe++;
  }

  console.log("🚀 ~ reports.forEach ~ safe:", safe);
  console.timeEnd("Execution Time");
} catch (err) {
  console.error("Error reading the file:", err);
}

function isReportSafe(report: string) {
  const min = 1,
    max = 3;

  const levels = [];
  let inc, i;

  const levelsStr = report.split(" ");
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
