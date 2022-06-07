import {get, has, isObject} from './util';

describe('Util', () => {

  describe('#get', () => {

    const simpleObject: any = { a: { b: 2 } };
    const complexObject: any = { a: [{ bar: { c: 3 } }] };
    const falsyObject: any = { a: null, b: undefined, c: 0 };

    it('a.b', () => {
      expect(get(simpleObject, 'a.b')).toEqual(2);
    });

    it('a[0].bar.c', () => {
      expect(get(complexObject, 'a[0].bar.c')).toEqual(3);
    });

    it('[\'a\', \'0\', \'bar\', \'c\']', () => {
      expect(get(complexObject, ['a', '0', 'bar', 'c'])).toEqual(3);
    });

    it('a.bar.c with default', () => {
      expect(get(simpleObject, 'a.bar.c', 'default')).toEqual('default');
    });

    it('a.bar.c with default', () => {
      expect(get(complexObject, 'a.bar.c', 'default')).toEqual('default');
    });

    it('null', () => {
      expect(get(complexObject, null)).toEqual(undefined);
    });

    it('a with default', () => {
      expect(get(falsyObject, 'a', 'default')).toEqual(null);
    });

    it('b with default', () => {
      expect(get(falsyObject, 'b', 'default')).toEqual('default');
    });

    it('c with default', () => {
      expect(get(falsyObject, 'c', 'default')).toEqual(0);
    });
  });

  describe('#isObject', () => {

    it('should return true if is object instance', () => {
      expect(isObject({})).toBe(true);
    });

    it('should return true if is an array instance', () => {
      expect(isObject([1, 2, 3])).toBe(true);
    });

    it('should return true if is anonymous function', () => {
      expect(isObject(() => {})).toBe(true);
    });

    it('should return true if is null', () => {
      expect(isObject(null)).toBe(false);
    });
  });

  describe('#has', () => {

    const object: any = { a: { bar: 2 } };

    it('\'a\'', () => {
      expect(has(object, 'a')).toBe(true);
    });

    it('\'a.bar\'', () => {
      expect(has(object, 'a.bar')).toBe(true);
    });

    it('[\'a\', \'bar\']', () => {
      expect(has(object, ['a', 'bar'])).toBe(true);
    });

    it('[\'a\', \'c\']', () => {
      expect(has(object, ['a', 'c'])).toBe(false);
    });
  });
})
