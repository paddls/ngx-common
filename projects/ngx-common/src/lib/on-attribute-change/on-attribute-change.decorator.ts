import { asyncScheduler, BehaviorSubject } from 'rxjs';
import { observeOn } from 'rxjs/operators';

const ON_ATTRIBUTE_CHANGE_METADATA_KEY: string = 'ngx-common:on-attribute-change';
const ON_ATTRIBUTE_CHANGE_OBS_METADATA_KEY: string = 'ngx-common:on-attribute-change-observable';

function initializeAttribute(attribute: string, instance: any): void {
  if (!Reflect.hasOwnMetadata(`${ON_ATTRIBUTE_CHANGE_METADATA_KEY}:${attribute}`, instance)) {
    const source$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    Reflect.defineMetadata(`${ON_ATTRIBUTE_CHANGE_METADATA_KEY}:${attribute}`, source$, instance);
    Reflect.defineMetadata(`${ON_ATTRIBUTE_CHANGE_OBS_METADATA_KEY}:${attribute}`, source$.pipe(
      observeOn(asyncScheduler),
    ), instance);
  }
}

export function OnAttributeChange<T, R>(attribute: string): any {
  return (target: any, propertyKey: string) => {
    Object.defineProperty(target.constructor.prototype, attribute, {
      get(): any {
        initializeAttribute(attribute, this);

        return Reflect.getOwnMetadata(`${ON_ATTRIBUTE_CHANGE_METADATA_KEY}:${attribute}`, this).value;
      },
      set(value: any): void {
        initializeAttribute(attribute, this);

        Reflect.getOwnMetadata(`${ON_ATTRIBUTE_CHANGE_METADATA_KEY}:${attribute}`, this).next(value);
      },
      enumerable: true,
      configurable: true
    });

    Object.defineProperty(target.constructor.prototype, propertyKey, {
      get(): any {
        initializeAttribute(attribute, this);

        return Reflect.getOwnMetadata(`${ON_ATTRIBUTE_CHANGE_OBS_METADATA_KEY}:${attribute}`, this);
      },
      enumerable: true,
      configurable: true
    });
  };
}
