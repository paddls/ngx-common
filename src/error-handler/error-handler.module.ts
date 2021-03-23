import { InjectionToken, Injector, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { ErrorHandler } from './model/error-handler.model';
import { DefaultErrorHandler } from './handler/default-error.handler';

export const ERROR_HANDLER_TOKEN: InjectionToken<ErrorHandler> = new InjectionToken<ErrorHandler>('ERROR_HANDLER');

@NgModule()
export class NgxErrorHandlerModule {

  private static injector: Injector;

  public constructor(injector: Injector) {
    NgxErrorHandlerModule.injector = injector;
  }

  public static getInjector(): Injector {
    return NgxErrorHandlerModule.injector;
  }

  public static forRoot(handlers: Type<ErrorHandler>[]): ModuleWithProviders<NgxErrorHandlerModule> {
    return {
      ngModule: NgxErrorHandlerModule,
      providers: [
        DefaultErrorHandler,
        ...handlers.map((handler: Type<ErrorHandler>) => ({
          provide: ERROR_HANDLER_TOKEN,
          useClass: handler
        }))
      ]
    };
  }
}
