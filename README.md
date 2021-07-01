# NgxCommon

![ngx-common-ci](https://github.com/witty-services/ngx-common/workflows/ngx-common-build/badge.svg)
[![npm version](https://badge.fury.io/js/%40witty-services%2Fngx-common.svg)](https://badge.fury.io/js/%40witty-services%2Fngx-common)
![GitHub](https://img.shields.io/github/license/witty-services/ngx-common)
![GitHub repo size](https://img.shields.io/github/repo-size/witty-services/ngx-common)
![GitHub last commit](https://img.shields.io/github/last-commit/witty-services/ngx-common)
![GitHub issues](https://img.shields.io/github/issues/witty-services/ngx-common)
![GitHub top language](https://img.shields.io/github/languages/top/witty-services/ngx-common)

## Summary

* [How to install](#how-to-install)
* [Get Started](#get-started)
    * [@Log](#log)
    * [@OnAttributeChange](#onattributechange)
    * [takeUntilDestroy](#takeuntildestroy)

## How to install

```
npm install --save @witty-services/ngx-common
```

## Get Started

### @Log

Decorator ```@Log``` allow you to debug method without modifying internal code.

Usage:
```typescript
import {Log} from '@witty-services/ngx-commonn';
import {environment} from '../../environment.ts';

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

### @OnAttributeChange

Decorator ```@OnAttributeChange``` allow you to observe a class attribute with an observable.

Usage:
```typescript
import {takeUntilDestroy, OnAttributeChange} from '@witty-services/ngx-common';
import {Observable} from 'rxjs';

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

takeUntilDestroy will automatically unsubscribe on component, directive destroy.

Usage:
```typescript
import {takeUntilDestroy} from '@witty-services/ngx-common';
import {interval} from 'rxjs';

@OnDestroyListener()
class MyComponent {

  public constructor() {
    interval(100).pipe(
      takeUntilDestroy(this), // this observable will be unsubscribe automatically on component destroy
    ).subscribe();
  } 
}
```
