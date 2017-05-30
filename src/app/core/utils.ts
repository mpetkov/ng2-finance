export function numberUnitFormat(value:number, decimal:number = 0):string {
  return Math.abs(Number(value)) >= 1.0e+9
    ? Number(Math.abs(Number(value)) / 1.0e+9).toFixed(decimal) + 'B'
    : Math.abs(Number(value)) >= 1.0e+6
    ? Number(Math.abs(Number(value)) / 1.0e+6).toFixed(decimal) + 'M'
    : Math.abs(Number(value)) >= 1.0e+3
    ? Number(Math.abs(Number(value)) / 1.0e+3).toFixed(decimal) + 'K'
    : String(Math.abs(Number(value)).toFixed(decimal));
}

export function typeChecker(obj:any):string {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

export const localStorageAdapter = {
  getItem(key:string, type:string): any {
    let value:any = JSON.parse(localStorage.getItem(key));
    return (typeChecker(value) === type) ? value : null;
  },

  setItem(key:string, value:any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export class Types {
  static String = 'string';
  static Array = 'array';
}
