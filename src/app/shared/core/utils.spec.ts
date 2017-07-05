import {localStorageAdapter, numberUnitFormat, typeChecker} from './utils';

describe('Utils', () => {
  it('should add correct unit to number when numberUnitFormat() is called', () => {
    expect(numberUnitFormat(10)).toEqual('10');
    expect(numberUnitFormat(10, 2)).toEqual('10.00');
    expect(numberUnitFormat(1000)).toEqual('1K');
    expect(numberUnitFormat(1000000)).toEqual('1M');
    expect(numberUnitFormat(1000000000)).toEqual('1B');
  });

  it('should return the type of the variable when typeChecker() is called', () => {
    expect(typeChecker([])).toEqual('array');
    expect(typeChecker({})).toEqual('object');
    expect(typeChecker('a')).toEqual('string');
    expect(typeChecker(1)).toEqual('number');
  });

  it('should read/write to local storage with the localStorageAdapter functions', () => {
    localStorageAdapter.setItem('test', 2);
    expect(localStorageAdapter.getItem('test', 'number')).toBe(2);

    localStorageAdapter.setItem('test', 1);
    expect(localStorageAdapter.getItem('test', 'number')).toBe(1);

    localStorage.setItem('test', '[{ss:sas]');
    expect(localStorageAdapter.getItem('test', 'array')).toBeNull();
  });
});
