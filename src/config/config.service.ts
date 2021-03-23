import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { get } from 'lodash';
import { pluck, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { hardCache } from '@witty-services/rxjs-common';
import { CONFIG_URL_TOKEN } from './config.module';

@Injectable()
export class NgxConfigService {

  private readonly config$: Observable<any>;

  private config: any;

  public constructor(httpClient: HttpClient,
                     @Inject(CONFIG_URL_TOKEN) url: string) {
    this.config$ = httpClient.get(url).pipe(
      tap((config: any) => this.config = config),
      hardCache()
    );
  }

  public getConfig(key: string): Observable<any> {
    return this.config$.pipe(
      pluck(key),
    );
  }

  public getConfigSync(key: string): any {
    return get(this.config, key);
  }
}
