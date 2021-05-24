import { Log } from './log.decorator';
import { Observable, of } from 'rxjs';

describe('LogDecorator', () => {
  class Test {
    @Log()
    public doIt(action: number): number {
      return action;
    }

    @Log()
    public doItAsync(action: number): Promise<number> {
      return Promise.resolve(action);
    }

    @Log()
    public doItRx(action: number): Observable<number> {
      return of(action);
    }
  }

  it('should log', () => {
    spyOn(console, 'log').and.callThrough();

    new Test().doIt(3);

    expect(console.log).toHaveBeenCalledTimes(2);
  });

  it('should log promise', (done: DoneFn) => {
    spyOn(console, 'log').and.callThrough();

    new Test().doItAsync(3).then(() => {
      expect(console.log).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('should log rx', (done: DoneFn) => {
    spyOn(console, 'log').and.callThrough();

    new Test().doItRx(3).subscribe(() => {
      expect(console.log).toHaveBeenCalledTimes(2);
      done();
    });
  });
});
