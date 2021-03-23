import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxConfigService } from './config.service';
import { CONFIG_URL_TOKEN } from './config.token';

@NgModule()
export class NgxConfigModule {

  public static forRoot(url: string): ModuleWithProviders<NgxConfigModule> {
    return {
      ngModule: NgxConfigModule,
      providers: [
        NgxConfigService,
        {
          provide: CONFIG_URL_TOKEN,
          useValue: url
        }
      ]
    };
  }
}
