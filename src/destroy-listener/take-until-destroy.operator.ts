/**
 * Subscribe until the component emit destroy
 * @param instance the component instance
 */
import {takeUntil} from 'rxjs/operators';
import {getOnDestroy, setupOnDestroy} from './destroy-listener.decorator';
import {MonoTypeOperatorFunction} from 'rxjs';

export function takeUntilDestroy<I, O>(instance: any): MonoTypeOperatorFunction<unknown> {
  setupOnDestroy(instance);
  return takeUntil(getOnDestroy(instance));
}
