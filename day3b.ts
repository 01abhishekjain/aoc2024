import fs from "fs";

try {
  console.time("Execution Time");

  let sum = 0;

  const data = fs.readFileSync("./day3input.txt", "utf8");
  const regex = /(do\(\)|don\'t\(\)|mul\(\d{1,3}\,\d{1,3}\))/;

  const split = data.split(regex);

  let doTake = true;
  split.forEach((pair, i) => {
    const isOdd = i % 2 === 0;
    if (isOdd) return;
    switch (pair.substring(0, 3)) {
      case "do(":
        doTake = true;
        break;
      case "don":
        doTake = false;
        break;
      case "mul":
        const [n1, n2] = pair.split(/(\d{1,3}\,\d{1,3})/)[1].split(",");
        doTake ? (sum += parseInt(n1) * parseInt(n2)) : null;
        break;
    }
  });

  console.log("🚀 ~ sum:", sum);
  console.timeEnd("Execution Time");
} catch (err) {
  console.error("Error reading the file:", err);
}
