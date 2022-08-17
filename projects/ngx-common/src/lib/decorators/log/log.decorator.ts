import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export function Log(active: boolean = true, color: string = '#4CAF50'): MethodDecorator {
  return (target: any, propertyKey: any, descriptor: any): any => {
    if (active) {
      const originalMethod: any = descriptor.value;

      descriptor.value = descriptor.value = function(...args: any): any {
        const time: number = new Date().getTime();
        console.log(`%c ${ target.constructor.name } > ${ propertyKey }`, `color: ${ color }; font-weight: bold`, ...args);
        const result: any = originalMethod.apply(this, args);
        if (result instanceof Promise) {
          return result.then((data: any) => {
            console.log(`%c ${target.constructor.name} < ${propertyKey} (${new Date().getTime() - time} ms)`, `color: ${color}; font-weight: bold`, data);

            return data;
          });
        } else if (result instanceof Observable) {
          return result.pipe(tap((data: any) => {
            console.log(`%c ${target.constructor.name} < ${propertyKey} (${new Date().getTime() - time} ms)`, `color: ${color}; font-weight: bold`, data);
          }));
        } else {
          console.log(`%c ${target.constructor.name} < ${propertyKey} (${new Date().getTime() - time} ms)`, `color: #4CAF50; font-weight: bold`, result);

          return result;
        }
      };
    }
    return descriptor;
  };
}
