export class RuntimeError {
  public constructor(public readonly code: string,
                     public readonly origin?: string,
                     public readonly message?: string) {
  }
}
