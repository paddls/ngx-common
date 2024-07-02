import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {NgxLocalStorageService} from './local-storage.service';

export function provideNgxLocalStorage(): Provider[] {
    return [
        NgxLocalStorageService
    ];
}

@NgModule()
export class NgxLocalStorageModule {

    /**
     * @deprecated user provideNgxLocalStorage() instead
     */
    public static forRoot(): ModuleWithProviders<NgxLocalStorageModule> {
        return {
            ngModule: NgxLocalStorageModule,
            providers: provideNgxLocalStorage()
        };
    }
}
