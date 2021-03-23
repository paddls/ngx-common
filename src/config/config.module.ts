import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxConfigService } from './config.service';

export const CONFIG_URL_TOKEN: InjectionToken<string> = new InjectionToken('CONFIG_URL_TOKEN');

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
