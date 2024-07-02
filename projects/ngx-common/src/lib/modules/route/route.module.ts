import {APP_INITIALIZER, Injector, NgModule, Provider} from '@angular/core';

export function provideNgxRoute(): Provider[] {
  return [
    {
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector) => (): void => {
        NgxRouteModule.injector = injector;
      },
      multi: true,
      deps: [Injector]
    }
  ]
}

// @dynamic
@NgModule({
  providers: provideNgxRoute()
})
export class NgxRouteModule {

  public static injector: Injector;

  public static getInjector(): Injector {
    return NgxRouteModule.injector;
  }
}
