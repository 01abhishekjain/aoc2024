import fs from "fs";

try {
  console.time("Execution Time");
  let distance = 0;

  const list1: number[] = [];
  const list2: number[] = [];

  const data = fs.readFileSync("./day1input.txt", "utf8");
  const split = data.split("\n"); // split[0]

  split.forEach((pair) => {
    const [l1, _, __, l2] = pair.split(" ");
    list1.push(parseInt(l1));
    list2.push(parseInt(l2));
  });

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);
  for (let i = 0; i < list1.length; i++) {
    distance += Math.abs(list2[i] - list1[i]);
  }
  console.log("🚀 ~ distance:", distance);
  console.timeEnd("Execution Time");
} catch (err) {
  console.error("Error reading the file:", err);
}
