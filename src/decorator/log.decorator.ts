import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export function Log(active: boolean = true): MethodDecorator {
  return (target: any, propertyKey: any, descriptor: any): any => {
    if (active) {
      const originalMethod: any = descriptor.value;

      descriptor.value = descriptor.value = function(...args: any): any {
        const time: number = new Date().getTime();
        console.log(`${target.constructor.name} > ${propertyKey}`, ...args);
        const result: any = originalMethod.apply(this, args);
        if (result instanceof Promise) {
          return result.then((data: any) => {
            console.log(`${target.constructor.name} < ${propertyKey} (${new Date().getTime() - time} ms)`, data);

            return data;
          });
        } else if (result instanceof Observable) {
          return result.pipe(tap((data: any) => {
            console.log(`${target.constructor.name} < ${propertyKey} (${new Date().getTime() - time} ms)`, data);
          }));
        } else {
          console.log(`${target.constructor.name} < ${propertyKey} (${new Date().getTime() - time} ms)`, result);

          return result;
        }
      };
    }
    return descriptor;
  };
}
