import { RuntimeError } from './runtime.error';

export class NotImplementedError extends RuntimeError {
  public constructor() {
    super('not_implemented');
  }
}
