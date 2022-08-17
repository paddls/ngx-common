import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxLocalStorageService } from './local-storage.service';

@NgModule()
export class NgxLocalStorageModule {

  public static forRoot(): ModuleWithProviders<NgxLocalStorageModule> {
    return {
      ngModule: NgxLocalStorageModule,
      providers: [
        NgxLocalStorageService
      ]
    };
  }
}
