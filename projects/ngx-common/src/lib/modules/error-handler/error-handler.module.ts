import {APP_INITIALIZER, InjectionToken, Injector, ModuleWithProviders, NgModule, Provider, Type} from '@angular/core';
import {ErrorHandler} from './model/error-handler.model';
import {DefaultErrorHandler} from './handler/default-error.handler';
import {ErrorHandlingService} from './error-handling.service';

export const ERROR_HANDLER_TOKEN: InjectionToken<ErrorHandler> = new InjectionToken<ErrorHandler>('ERROR_HANDLER');

const MODULE_PROVIDERS: Provider[] = [
    ErrorHandlingService,
    DefaultErrorHandler
];

/**
 * @ignore
 */
function ngxSerializerInitializer(injector: Injector): () => void {
    return () => {
        NgxErrorHandlerModule.injector = injector;
    }
}

export function provideNgxErrorHandler(handlers: Type<ErrorHandler>[]): Provider[] {
    return [
        {
            provide: APP_INITIALIZER,
            useFactory: ngxSerializerInitializer,
            multi: true,
            deps: [Injector]
        },
        ...MODULE_PROVIDERS,
        ...handlers.map((handler: Type<ErrorHandler>) => ({
            provide: ERROR_HANDLER_TOKEN,
            useClass: handler,
            multi: true
        }))
    ];
}

// @dynamic
@NgModule()
export class NgxErrorHandlerModule {

    public static injector: Injector;

    public static getInjector(): Injector {
        return NgxErrorHandlerModule.injector;
    }

    /**
     * @deprecated use provideNgxErrorHandler() instead
     */
    public static forRoot(handlers: Type<ErrorHandler>[]): ModuleWithProviders<NgxErrorHandlerModule> {
        return {
            ngModule: NgxErrorHandlerModule,
            providers: provideNgxErrorHandler(handlers)
        };
    }
}
