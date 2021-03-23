import { InjectionToken, Injector, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { IErrorHandler } from './model/error-handler.model';
import { DefaultErrorHandler } from './handler/default-error.handler';

export const ERROR_HANDLER_TOKEN: InjectionToken<IErrorHandler> = new InjectionToken<IErrorHandler>('ERROR_HANDLER');

@NgModule()
export class NgxErrorHandlerModule {

  private static injector: Injector;

  public constructor(injector: Injector) {
    NgxErrorHandlerModule.injector = injector;
  }

  public static getInjector(): Injector {
    return NgxErrorHandlerModule.injector;
  }

  public static forRoot(handlers: Type<IErrorHandler>[]): ModuleWithProviders {
    return {
      ngModule: NgxErrorHandlerModule,
      providers: [
        DefaultErrorHandler,
        ...handlers.map((handler: Type<IErrorHandler>) => ({
          provide: ERROR_HANDLER_TOKEN,
          useClass: handler
        }))
      ]
    };
  }
}
