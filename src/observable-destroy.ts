import { OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { first, shareReplay } from 'rxjs/operators';

export abstract class ObservableDestroy implements OnDestroy {

  private _onDestroy$: Subject<void> = new Subject<void>();

  protected onDestroy$: Observable<void> = this._onDestroy$.pipe(
    first(),
    shareReplay(1)
  );

  public ngOnDestroy(): void {
    this._onDestroy$.next();
  }

}
