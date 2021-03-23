import { has, isObject, keys } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NgxLocalStorageService {

  private readonly storage: { [key: string]: BehaviorSubject<string> } = {};

  public constructor() {
    for (let i: number = 0; i < localStorage.length; i++) {
      const key: string = localStorage.key(i);

      this.storage[key] = new BehaviorSubject(localStorage.getItem(key));
    }
  }

  public clear(): void {
    for (const key of keys(this.storage)) {
      this.remove(key);
    }
  }

  public get(key: string): Observable<string> {
    if (!has(this.storage, key)) {
      this.storage[key] = new BehaviorSubject(null);
    }

    return this.storage[key];
  }

  public set(key: string, value: string): Observable<string> {
    if (!has(this.storage, key)) {
      this.storage[key] = new BehaviorSubject(value);
    } else {
      this.storage[key].next(value);
    }
    localStorage.setItem(key, isObject(value) ? JSON.stringify(value) : value);

    return this.get(key);
  }

  public remove(key: string): void {
    this.storage[key].next(null);
    localStorage.removeItem(key);
  }

}
