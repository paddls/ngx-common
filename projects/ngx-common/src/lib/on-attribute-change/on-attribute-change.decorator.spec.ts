import 'reflect-metadata';
import {OnAttributeChange} from './on-attribute-change.decorator';
import {Observable} from 'rxjs';
import {ifNotNull} from '@witty-services/rxjs-common';

describe('OnAttributeChangeDecorator', () => {
  it('should send value to implicit property', (done: DoneFn) => {
    class Test {
      public attr: string;
      @OnAttributeChange() attr$: Observable<string>;
    }

    const test = new Test();

    test.attr$.pipe(
      ifNotNull()
    ).subscribe(
      (value) => {
        expect(value).toBe("Test 1");
        done();
      }
    );
    test.attr = "Test 1";
  });

  it('should send value to specified property', (done: DoneFn) => {
    class Test2 {
      public attr: string;
      @OnAttributeChange('attr') attrChange$: Observable<string>;
    }

    const test2 = new Test2();

    test2.attrChange$.pipe(
      ifNotNull()
    ).subscribe(
      (value) => {
        expect(value).toBe("Test 2");
        done();
      }
    );
    test2.attr = "Test 2";
  });
});
