import { Injector, NgModule } from '@angular/core';

// @dynamic
@NgModule()
export class NgxRouteModule {

  private static injector: Injector;

  public constructor(injector: Injector) {
    NgxRouteModule.injector = injector;
  }

  public static getInjector(): Injector {
    return NgxRouteModule.injector;
  }
}
