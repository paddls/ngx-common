import { Observable } from 'rxjs';
import { RuntimeError } from './runtime.error';

export interface IErrorHandler {
  canHandle(error: RuntimeError): boolean;

  handle(error: RuntimeError): Observable<void>;
}

