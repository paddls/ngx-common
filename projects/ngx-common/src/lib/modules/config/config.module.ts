import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {NgxConfigService} from './config.service';
import {CONFIG_URL_TOKEN} from './config.token';

export function provideNgxConfig(url: string): Provider[] {
    return [
        NgxConfigService,
        {
            provide: CONFIG_URL_TOKEN,
            useValue: url
        }
    ];
}

@NgModule()
export class NgxConfigModule {

    public static forRoot(url: string): ModuleWithProviders<NgxConfigModule> {
        return {
            ngModule: NgxConfigModule,
            providers: provideNgxConfig(url)
        };
    }
}
