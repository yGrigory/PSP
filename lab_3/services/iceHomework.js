export function calculateEscortIntervalGcd(...iceEscortIntervals) {
  const normalizedIntervals = iceEscortIntervals
    .map((interval) => Math.trunc(Math.abs(interval)))
    .filter((interval) => interval > 0);

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

export function compressIceReportRle(iceReportString) {
  const sourceReport = String(iceReportString ?? "");
  if (sourceReport.length === 0) {
    return "";
  }

  let reportIndex = 0;
  let compressedReport = "";
  let serviceSignal = "INIT";
  const routeStatusLog = ["ICE_READY"];

  do {
    serviceSignal = routeStatusLog.shift() || "ICE_READY";
  } while (serviceSignal !== "ICE_READY");

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
