import fs from "fs";

try {
  console.time("Execution Time");

  let sum = 0;

  const data = fs.readFileSync("./day3input.txt", "utf8");

  const regex = /mul\((\d{1,3}\,\d{1,3})\)/;

  const split = data.split(regex);

  split.forEach((pair, i) => {
    const isOdd = i % 2 === 0;
    if (isOdd) return;

    const [n1, n2] = pair.split(",");
    sum += parseInt(n1) * parseInt(n2);
  });

  console.log("🚀 ~ sum:", sum);
  console.timeEnd("Execution Time");
} catch (err) {
  console.error("Error reading the file:", err);
}
