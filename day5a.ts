import fs from "fs";

try {
  console.time("Execution Time");

  let sum = 0;

  const data = fs.readFileSync("./day5input.txt", "utf8");

  const [rulesRaw, updatesRaw] = data.split("\n\n");

  const rules: Record<string, string[][]> = {};
  rulesRaw.split("\n").forEach((ruleStr) => {
    const [n1, n2] = ruleStr.split("|");

    if (!rules[n1]) {
      rules[n1] = [];
    }
    if (!rules[n2]) {
      rules[n2] = [];
    }

    rules[n1].push([n1, n2]);
    rules[n2].push([n1, n2]);
  });

  const updates = updatesRaw
    .split("\n")
    .map((updateStr) => updateStr.split(","));

  updates.forEach((update) => {
    let i: number;
    for (i = 0; i < update.length; i++) {
      const updateNum = update[i];

      // gather all relevant rules
      const numRules = rules[updateNum];
      const relevantRules = numRules.filter(
        ([n1, n2]) =>
          (n1 === updateNum && update.includes(n2)) ||
          (n2 === updateNum && update.includes(n1))
      );

      // gather all rules where update[i] is on right
      const potentialBreakingRules = relevantRules.filter(
        ([_, n2]) => n2 === updateNum
      );

      // check that the left number must not be part of update.slice(i+1)
      const someRuleBreaking = potentialBreakingRules.some(([n1]) =>
        update.slice(i + 1).includes(n1)
      );

      if (someRuleBreaking) break;
    }

    const didSucceed = i === update.length;
    if (didSucceed) {
      const midNum = update[Math.floor(update.length / 2)];
      sum += parseInt(midNum);
    }
  });

  console.log("🚀 ~ sum:", sum);
  console.timeEnd("Execution Time");
} catch (err) {
  console.error("Error reading the file:", err);
}

// time taken: 45 min for first correct solution. With optim: 60 min.
