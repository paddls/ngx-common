import { Observable } from 'rxjs';
import { RuntimeError } from './runtime.error';

export interface ErrorHandler {
  canHandle(error: RuntimeError): boolean;

  handle(error: RuntimeError): Observable<void>;
}

