import { Inject, Injectable } from '@angular/core';
import { ErrorHandler } from './model/error-handler.model';
import { RuntimeError } from './model/runtime.error';
import { ERROR_HANDLER_TOKEN } from './error-handler.module';
import { DefaultErrorHandler } from './handler/default-error.handler';

@Injectable()
export class ErrorHandlingService {

  public constructor(@Inject(ERROR_HANDLER_TOKEN) private readonly errorHandlers: ErrorHandler[],
                     private readonly defaultHandler: DefaultErrorHandler) {
  }

  public handle(error: any): void {
    const exception: RuntimeError = this.getFormattedException(error);
    const handlers: ErrorHandler[] = this.errorHandlers
      .filter((handler: ErrorHandler) => handler.canHandle(exception));

    if (handlers.length) {
      handlers.forEach((handler: ErrorHandler) => {
        handler.handle(exception);
      });
    } else {
      this.defaultHandler.handle(error);
    }
  }

  public getFormattedException(error: any): RuntimeError {
    if (error instanceof RuntimeError) {
      return error;
    } else {
      return new RuntimeError(error.code ?? error.name ?? error.message, error, error.message ?? null);
    }
  }
}
