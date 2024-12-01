import fs from "fs";

try {
  console.time("Execution Time");

  let similarity = 0;

  const freq: { [key: string]: number[] } = {};

  const data = fs.readFileSync("./day1input.txt", "utf8");
  const split = data.split("\n"); // split[0]

  split.forEach((pair) => {
    let [l1, _, __, l2] = pair.split(" ");

    if (!Object.keys(freq).includes(l1)) {
      freq[l1] = [1, 0];
    } else {
      freq[l1] = [freq[l1][0] + 1, freq[l1][1]];
    }

    if (!Object.keys(freq).includes(l2)) {
      freq[l2] = [0, 1];
    } else {
      freq[l2] = [freq[l2][0], freq[l2][1] + 1];
    }
  });

  Object.keys(freq).forEach((n) => {
    if (freq[n][0]) {
      similarity = similarity + parseInt(n) * freq[n][1];
    }
  });
  console.log("🚀 ~ Object.keys ~ similarity:", similarity);
  console.timeEnd("Execution Time");
} catch (err) {
  console.error("Error reading the file:", err);
}
