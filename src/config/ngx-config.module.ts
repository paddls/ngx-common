import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxConfigService } from './ngx-config.service';

export const CONFIG_URL_TOKEN: InjectionToken<string> = new InjectionToken('CONFIG_URL_TOKEN');

@NgModule()
export class NgxConfigModule {

  public static forRoot(url: string): ModuleWithProviders {
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
