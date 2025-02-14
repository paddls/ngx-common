import { EnvironmentProviders, inject, InjectionToken, Injector, makeEnvironmentProviders, ModuleWithProviders, NgModule, provideAppInitializer, Type } from '@angular/core';
import { ErrorHandler } from './model/error-handler.model';
import { DefaultErrorHandler } from './handler/default-error.handler';
import { ErrorHandlingService } from './error-handling.service';

export const ERROR_HANDLER_TOKEN: InjectionToken<ErrorHandler> = new InjectionToken<ErrorHandler>('ERROR_HANDLER');

export function provideErrorHandler(handlers: Type<ErrorHandler>[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => ((injector: Injector) => (): void => {
      NgxErrorHandlerModule.injector = injector;
    })(inject(Injector))()),
    ErrorHandlingService,
    DefaultErrorHandler,
    ...handlers.map((handler: Type<ErrorHandler>) => ({
      provide: ERROR_HANDLER_TOKEN,
      useClass: handler,
      multi: true
    }))
  ]);
}

// @dynamic
@NgModule()
export class NgxErrorHandlerModule {

  public static injector: Injector;

  /**
   * @deprecated use provideErrorHandler() instead
   */
  public static forRoot(handlers: Type<ErrorHandler>[]): ModuleWithProviders<NgxErrorHandlerModule> {
    return {
      ngModule: NgxErrorHandlerModule,
      providers: [
        provideErrorHandler(handlers)
      ]
    };
  }
}
