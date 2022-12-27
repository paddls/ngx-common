# NgxCommon

![ngx-common-ci](https://github.com/paddls/ngx-common/workflows/ngx-common-build/badge.svg)
[![npm version](https://badge.fury.io/js/%40paddls%2Fngx-common.svg)](https://badge.fury.io/js/%40paddls%2Fngx-common)
![GitHub](https://img.shields.io/github/license/paddls/ngx-common)
![GitHub repo size](https://img.shields.io/github/repo-size/paddls/ngx-common)
![GitHub last commit](https://img.shields.io/github/last-commit/paddls/ngx-common)
![GitHub issues](https://img.shields.io/github/issues/paddls/ngx-common)
![GitHub top language](https://img.shields.io/github/languages/top/paddls/ngx-common)

## Informations

> :warning: Since version 2.0.3, ```ngx-common``` and ```rxjs-common``` have been published under ```@paddls``` namespace. We continue to maintain ```@witty-services``` namespace, but now, ```ngx-common``` depends on ```@paddls/rxjs-common```

| `Angular`          | `NgxCommon`       |
|--------------------|-------------------|
| `15.0.0` and above | `6.0.0` and above |
| `14.0.0` and above | `5.0.0` and above |
| `13.0.0` and above | `4.0.0` and above |
| `12.0.0` and above | `3.0.0` and above |
| `6.0.0` and above  | `1.0.0` and above |

## Summary

* [How to install](#how-to-install)
* [Get Started](#get-started)
    * [@OnAttributeChange](#onattributechange)
    * [takeUntilDestroy](#takeuntildestroy)
    * [Error handling](#error-handling)
    * [Configuration provider](#configuration-provider)
    * [Local storage service](#local-storage-service)
    * [@Log](#log)

## How to install

```
npm install --save @paddls/ngx-common
```

## Get Started

### @OnAttributeChange

Decorator ```@OnAttributeChange``` allow you to observe a class attribute with an observable.

Usage:

```typescript
import { takeUntilDestroy, OnAttributeChange } from '@paddls/ngx-common';
import { Observable } from 'rxjs';

class MyComponent {

  public attribute: string;

  @OnAttributeChange('attribute')
  public myAttribute$: Observable<string>; // emit value on each modification of the referent attribute

  public constructor() {
    this.myAttribute$.pipe(
      takeUntilDestroy(this),
    ).subscribe(() => {
      // do some stuff
    });
  }
}
```

### takeUntilDestroy

`takeUntilDestroy` will automatically unsubscribe any `RxJS` subscription on component or directive destruction.

Usage:

```typescript
import { takeUntilDestroy, OnDestroyListener } from '@paddls/ngx-common';
import { interval } from 'rxjs';

@OnDestroyListener()
class MyComponent {

  public constructor() {
    interval(100).pipe(
      takeUntilDestroy(this), // this observable will be unsubscribed automatically on component destruction
    ).subscribe();
  }
}
```

### Error handling

`NgxErrorHandlerModule` provides a robust error handling mechanism to handle error through your Angular app.

First, import `NgxErrorHandlerModule` in your root module :

```typescript
import { NgxErrorHandlerModule } from '@paddls/ngx-common';

@NgModule({
  imports: [
    NgxErrorHandlerModule.forRoot([
      MyErrorHandler
    ]),
  ]
})
export class AppModule {
}
```

You can register a list of error handlers in the `forRoot` method of the module.

Here is an example of an error handler :

```typescript
@Injectable()
export class DefaultHttpErrorHandler implements ErrorHandler {

  public handle(err: any): Observable<any> {
    // DO SOMETHING

    return throwError(err);
  }

  public canHandle(err: any): boolean {
    return true; // Filter errors
  }
}
```

You can specify as many handlers as you want. `handle()` methods will be called in order each time `canHandle()` method
returns `true`.

To handle any `RxJS` error, simply add the `handleError()` operator to your `Observable` :

```typescript
source$.pipe(
  handleError()
).subscribe()
```

### Configuration provider

`NgxConfigModule` provides a wrapper to inject any app config retrieved by `HTTP` into your app. To start, simply import
`NgxConfigModule` in your root module :

```typescript
import { NgxConfigModule } from '@paddls/ngx-common';

@NgModule({
  imports: [
    NgxConfigModule.forRoot('https://my-config-url.com'),
  ]
})
export class AppModule {
}
```

Then, each time you need your app config through your app, inject `NgxConfigService` :

```typescript
import { NgxConfigService } from '@paddls/ngx-common';

@Injectable()
export class MyService {

  public constructor(configService: NgxConfigService) {
    configService.getConfig('key').subscribe(console.log);
    
    console.log(configService.getConfigSnapshot('key'));
  }

}
```

### Local storage service

`NgxLocalStorageModule` provides a wrapper to `localStorage` API that injects values into `RxJS` hot observables each time
a value is updated into the storage.
To start, simply import `NgxLocalStorageModule` in your root module :

```typescript
import { NgxLocalStorageModule } from '@paddls/ngx-common';

@NgModule({
  imports: [
    NgxLocalStorageModule.forRoot(),
  ]
})
export class AppModule {
}
```

Then, use it like this :

```typescript
import { NgxLocalStorageService } from '@paddls/ngx-common';

@Injectable()
export class MyService {

  public constructor(localStorageService: NgxLocalStorageService) {
    localStorageService.get('key').subscribe(console.log); // 'value'
    
    localStorageService.set('key', 'value').subscribe(console.log); // 'value'
    
    localStorageService.remove('key');
    
    localStorageService.clear();
  }

}
```

### @Log

Decorator ```@Log``` allows you to debug method without modifying internal code.

Usage:

```typescript
import { Log } from '@paddls/ngx-common';
import { environment } from '../../environment.ts';

class MyClass {

  @Log()
  public myMethod(): any {

  }

  @Log(!environment.production) // the log should be disabled on production
  public myMethod(): any {

  }

  @Log(true, 'red') // override default log color
  public myMethod(): any {

  }
}

new MyClass().myMethod();
// => should log duration, class, method, args and returned value
```
