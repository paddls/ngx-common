import { OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { first, shareReplay } from 'rxjs/operators';

/**
 * @deprecated use @DestroyListener and takeUntilDestroy
 */
export abstract class ObservableDestroy implements OnDestroy {

  private _onDestroy$: Subject<void> = new Subject<void>();

  /**
   * @deprecated use @DestroyListener and takeUntilDestroy()
   */
  protected onDestroy$: Observable<void> = this._onDestroy$.pipe(
    first(),
    shareReplay(1)
  );

  public ngOnDestroy(): void {
    this._onDestroy$.next();
  }

}
