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

export function OnAttributeChange<T, R>(defaultAttribute: string = null): any {
  return (target: any, propertyKey: string) => {
    const isValid: boolean = !!defaultAttribute || new RegExp('^\\w+\\$$').test(propertyKey);
    if(!isValid) {
      throw new Error('Invalid OnAttributeChange property: it should end with "$" or been specified as a parameter.');
    }
    const attribute: string = defaultAttribute || propertyKey.slice(0, -1);
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
