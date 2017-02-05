export function numberUnitFormat(value:number, decimal:number = 0):string {
  return Math.abs(Number(value)) >= 1.0e+9
    ? Number(Math.abs(Number(value)) / 1.0e+9).toFixed(decimal) + 'B'
    : Math.abs(Number(value)) >= 1.0e+6
    ? Number(Math.abs(Number(value)) / 1.0e+6).toFixed(decimal) + 'M'
    : Math.abs(Number(value)) >= 1.0e+3
    ? Number(Math.abs(Number(value)) / 1.0e+3).toFixed(decimal) + 'K'
    : Math.abs(Number(value));
}
