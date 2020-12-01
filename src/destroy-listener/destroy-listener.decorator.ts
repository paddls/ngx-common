import {Subject} from 'rxjs';

const DESTROY_LISTENER_METADATA_KEY: string = 'ngx-common:destroy-listener';

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
    Reflect.defineMetadata(DESTROY_LISTENER_METADATA_KEY, new Subject<void>(), instance);
  }
}

export function DestroyListener<T, R>(): ClassDecorator {
  return (type: any) => {
    type.prototype.ngOnDestroy = onDestroyListener(type.prototype.ngOnDestroy);
  };
}
