const {
  calculateEscortIntervalGcd,
  compressIceReportRle
} = require("../services/iceHomework.cjs");

function printHelp() {
  console.log("Использование:");
  console.log("  node cli/homework-cli.cjs gcd 180 240 300 420");
  console.log("  node cli/homework-cli.cjs rle ССССММЛЛЛЛСССМ");
}

const [, , command, ...args] = process.argv;

if (!command) {
  printHelp();
  process.exit(0);
}

if (command === "gcd") {
  if (args.length === 0) {
    console.log("Для gcd передай хотя бы одно число.");
    printHelp();
    process.exit(1);
  }

  const result = calculateEscortIntervalGcd(...args.map(Number));
  console.log(`НОД интервалов: ${result}`);
  process.exit(0);
}

if (command === "rle") {
  if (args.length === 0) {
    console.log("Для rle передай строку отчета.");
    printHelp();
    process.exit(1);
  }

  const source = args.join(" ");
  const result = compressIceReportRle(source);
  console.log(`RLE: ${result}`);
  process.exit(0);
}

console.log(`Неизвестная команда: ${command}`);
printHelp();
process.exit(1);
