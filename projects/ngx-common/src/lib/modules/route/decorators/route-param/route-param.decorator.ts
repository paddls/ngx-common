import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { softCache } from '@paddls/rxjs-common';
import { Observable } from 'rxjs';
import { NgxRouteModule } from '../../route.module';
import { PropertyKeyConfiguration } from '../../property-key-configuration.interface';

export interface RouteParamContext {

}

export interface RouteParamContextConfiguration extends RouteParamContext, PropertyKeyConfiguration {

  key: string;

}

export const ROUTE_PARAM_METADATA_KEY: string = 'ngx-common:route-param';

export const ROUTE_PARAM_INSTANCE_METADATA_KEY: string = 'ngx-common:route-param-instance';

export function RouteParam(key: string): any {
  return (target: any, propertyKey: string) => {

    const routeParamContextConfiguration: RouteParamContextConfiguration = {
      propertyKey,
      key
    };

    let metadata: RouteParamContextConfiguration[] = [];
    if (Reflect.has(target, ROUTE_PARAM_METADATA_KEY)) {
      metadata = Reflect.get(target, ROUTE_PARAM_METADATA_KEY);
    }
    Reflect.set(target, ROUTE_PARAM_METADATA_KEY, metadata.concat(routeParamContextConfiguration));

    Object.defineProperty(target.constructor.prototype, propertyKey, {
      get(): Observable<string> {
        if (Reflect.has(this, `${ ROUTE_PARAM_INSTANCE_METADATA_KEY }:${ propertyKey }`)) {
          return Reflect.get(this, `${ ROUTE_PARAM_INSTANCE_METADATA_KEY }:${ propertyKey }`);
        }
        const obs$: Observable<string> = NgxRouteModule.getInjector().get(ActivatedRoute).paramMap.pipe(
          map((paramMap: ParamMap) => paramMap.get(key)),
          softCache()
        );

        Reflect.set(this, `${ ROUTE_PARAM_INSTANCE_METADATA_KEY }:${ propertyKey }`, obs$);

        return obs$;
      },
      set: () => void 0,
      enumerable: true,
      configurable: true
    });
  };
}
