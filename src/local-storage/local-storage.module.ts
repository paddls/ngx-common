import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule()
export class NgxLocalStorage {

  public static forRoot(): ModuleWithProviders<NgxLocalStorage> {
    return {
      ngModule: NgxLocalStorage,
      providers: [
        NgxLocalStorage
      ]
    };
  }
}
