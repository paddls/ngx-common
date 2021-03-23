import 'reflect-metadata';

import { interval, Subscription } from 'rxjs';
import { takeUntilDestroy } from './take-until-destroy.operator';
import { OnDestroy } from '@angular/core';

describe('takeUntilDestroy', () => {

  it('should unsubscribe on component destroy', () => {
    class A {

      public subscription: Subscription;

      public constructor() {
        this.subscription = interval(200).pipe(
          takeUntilDestroy(this),
        ).subscribe();
      }
    }
    const a: A | any = new A();
    expect(a.subscription.closed).toBe(false);
    a.ngOnDestroy();
    expect(a.subscription.closed).toBe(true);
  });

  it('should unsubscribe on component destroy with custom destroy method', () => {
    class A implements OnDestroy {

      public subscription: Subscription;
      public destroyed: boolean = false;

      public constructor() {
        this.subscription = interval(200).pipe(
          takeUntilDestroy(this),
        ).subscribe();
      }

      public ngOnDestroy(): void {
        this.destroyed = true;
      }
    }
    const a: A = new A();
    expect(a.subscription.closed).toBe(false);
    expect(a.destroyed).toBe(false);
    a.ngOnDestroy();
    expect(a.subscription.closed).toBe(true);
    expect(a.destroyed).toBe(true);
  });
});
