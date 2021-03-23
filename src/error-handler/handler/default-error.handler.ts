import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { RuntimeError } from '../model/runtime.error';

@Injectable()
export class DefaultErrorHandler {

  public handle(error: RuntimeError): Observable<any> {
    return throwError(error);
  }
}
