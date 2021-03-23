import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule()
export class NgxLocalStorage {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxLocalStorage,
      providers: [
        NgxLocalStorage
      ]
    };
  }
}
