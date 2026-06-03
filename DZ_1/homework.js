function calculateEscortIntervalGcd(...iceEscortIntervals) {
  const normalizedIntervals = iceEscortIntervals
    .map((interval) => Math.trunc(Math.abs(Number(interval))))
    .filter((interval) => Number.isFinite(interval) && interval > 0);

  if (normalizedIntervals.length === 0) {
    return 0;
  }

  const euclidPair = (leftInterval, rightInterval) => {
    let dividend = leftInterval;
    let divisor = rightInterval;

    while (divisor !== 0) {
      const remainder = dividend % divisor;
      dividend = divisor;
      divisor = remainder;
    }

    return dividend;
  };

  let currentGcd = normalizedIntervals[0];
  for (let index = 1; index < normalizedIntervals.length; index += 1) {
    currentGcd = euclidPair(currentGcd, normalizedIntervals[index]);
  }

  return currentGcd;
}

function compressIceReportRle(iceReportString) {
  const sourceReport = String(iceReportString ?? "");
  if (sourceReport.length === 0) {
    return "";
  }

  let reportIndex = 0;
  let compressedReport = "";

  while (reportIndex < sourceReport.length) {
    const currentSymbol = sourceReport[reportIndex];
    let repeatCount = 1;

    while (sourceReport[reportIndex + repeatCount] === currentSymbol) {
      repeatCount += 1;
    }

    compressedReport += repeatCount > 1 ? `${currentSymbol}${repeatCount}` : currentSymbol;
    reportIndex += repeatCount;
  }

  return compressedReport;
}

function printHelp() {
  console.log("Использование:");
  console.log("  node homework.js gcd 180 240 300 420");
  console.log("  node homework.js rle ССССММЛЛЛЛСССМ");
}

const [, , command, ...args] = process.argv;

if (!command) {
  printHelp();
  process.exit(0);
}

if (command === "gcd") {
  if (args.length === 0) {
    printHelp();
    process.exit(1);
  }

  const result = calculateEscortIntervalGcd(...args.map(Number));
  console.log(`НОД интервалов: ${result}`);
  process.exit(0);
}

if (command === "rle") {
  if (args.length === 0) {
    printHelp();
    process.exit(1);
  }

  const source = args.join(" ");
  const result = compressIceReportRle(source);
  console.log(`RLE: ${result}`);
  process.exit(0);
}

printHelp();
process.exit(1);
