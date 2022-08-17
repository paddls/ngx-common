import { TestBed } from '@angular/core/testing';
import { Component, Directive } from '@angular/core';
import { RouteParam } from './route-param.decorator';
import { ActivatedRoute } from '@angular/router';
import { from, Observable } from 'rxjs';
import { NgxRouteModule } from '../../route.module';

describe('RouteParamDecorator', () => {

  @Component({
    selector: 'app-component',
    template: ''
  })
  class MyComponent {

    @RouteParam('paramKey')
    public readonly routeParam$: Observable<string>;

  }

  @Directive({
    selector: 'app-directive',
  })
  class MyDirective {

    @RouteParam('paramKey')
    public readonly routeParam$: Observable<string>;
  }

  let component: MyComponent;
  let directive: MyDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxRouteModule
      ],
      declarations: [
        MyComponent,
        MyDirective
      ],
      providers: [
        MyComponent,
        MyDirective,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: from([{get: (key: string) => `${ key }:first`}])
          }
        }
      ]
    });

    component = TestBed.inject(MyComponent);
    directive = TestBed.inject(MyDirective);
  });

  it('should subscribe to param map in components', (done: DoneFn) => {
    component.routeParam$.subscribe((value: string) => {
      expect(value).toEqual('paramKey:first');

      done();
    });
  });

});
