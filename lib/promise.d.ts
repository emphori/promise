/**
 * A strongly typed extension to the Promise interface, allowing for type
 * assertions on both the resolved and rejected values.
 */
export interface Promise<T, E = unknown> {
  then<RT = void, RE = never>(
    onfulfilled: ((_: T) => RT | Promise<RT, RE>) | null,
  ): Promise<RT, E | RE>;

  catch<RT, RE>(
    onrejected: ((_: E) => RT | Promise<RT, RE>) | null,
  ): Promise<RT, RE>;
}

/**
 * @see {Promise}
 *
 * @todo Add type interfaces for the remaing static methods found on a Promise
 */
export interface PromiseConstructor {
  new <T, E>(fn: (
    resolve: (_: T | Promise<T, E>) => void,
    reject: (_: E | Promise<E, E>) => void,
  ) => void): Promise<T, E>;

  /**
   * @todo Document the "resolve" method on the "PromiseConstructor"
   */
  resolve<T, E>(val: Promise<T, E>): Promise<T, E>;
  resolve<T>(val: T): Promise<T, never>;

  /**
   * @todo Document the empty "resolve" method on the "PromiseConstructor"
   */
  resolve(): Promise<void, never>;

  /**
   * @todo Document the "reject" method on the "PromiseConstructor"
   */
  reject<E>(val: E): Promise<never, E>;

  /**
   * @todo Document the "reject" method on the "PromiseConstructor"
   */
  reject(): Promise<never, void>;
}

export declare var Promise: PromiseConstructor;
