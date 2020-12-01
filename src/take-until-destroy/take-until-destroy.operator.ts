/**
 * Subscribe until the component emit destroy
 * @param instance the component instance
 */
import {takeUntil} from 'rxjs/operators';
import {MonoTypeOperatorFunction, Subject} from 'rxjs';

const DESTROY_LISTENER_METADATA_KEY: string = 'ngx-common:take-until-destroy';

function onDestroyComplete(instance: any): void {
  getOnDestroy(instance).next();
  getOnDestroy(instance).complete();
  Reflect.deleteMetadata(DESTROY_LISTENER_METADATA_KEY, instance);
}

function onDestroyListener(ngOnDestroy: () => void): () => void {
  return function(): void {
    if (ngOnDestroy) {
      ngOnDestroy.call(this);
    }
    onDestroyComplete(this);
  };
}

export function getOnDestroy(instance: any): Subject<void> {
  return Reflect.getOwnMetadata(DESTROY_LISTENER_METADATA_KEY, instance);
}

export function setupOnDestroy(instance: any): void {
  if (!Reflect.hasOwnMetadata(DESTROY_LISTENER_METADATA_KEY, instance)) {
    instance.__proto__.ngOnDestroy = onDestroyListener(instance.__proto__.ngOnDestroy);
    Reflect.defineMetadata(DESTROY_LISTENER_METADATA_KEY, new Subject<void>(), instance);
  }
}

export function takeUntilDestroy<I, O>(instance: any): MonoTypeOperatorFunction<unknown> {
  setupOnDestroy(instance);
  return takeUntil(getOnDestroy(instance));
}
