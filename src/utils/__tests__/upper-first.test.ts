import { upperFirst } from '../upper-first';

describe('upperFirst', () => {
  it('should return a string with a first character capitalized', () => {
    const test1 = 'cOMPANY';
    const test2 = 'some test text';
    const test3 = 'some test Text';

    expect(upperFirst(test1)).toEqual('COMPANY');
    expect(upperFirst(test2)).toEqual('Some test text');
    expect(upperFirst(test3)).toEqual('Some test Text');
  });
});
