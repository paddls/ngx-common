import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule()
export class NgxLocalStorageModule {

  public static forRoot(): ModuleWithProviders<NgxLocalStorageModule> {
    return {
      ngModule: NgxLocalStorageModule,
      providers: [
        NgxLocalStorageModule
      ]
    };
  }
}
