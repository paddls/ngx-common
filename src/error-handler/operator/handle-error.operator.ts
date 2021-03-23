import { MonoTypeOperatorFunction, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../error-handling.service';
import { NgxErrorHandlerModule } from '../error-handler.module';

export function handleError<T>(): MonoTypeOperatorFunction<T> {
  return catchError((error: any) => {
      NgxErrorHandlerModule.getInjector()
        .get(ErrorHandlingService)
        .handle(error);

      return throwError(error);
    }
  );
}
