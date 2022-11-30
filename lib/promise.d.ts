/**
 * A strongly typed extension to the Promise interface, allowing for type
 * assertions on both the resolved and rejected values.
 */
export interface Promise<T, E = unknown> {
  then<RT = void, RE = never>(
    onfulfilled: ((_: T) => RT | Promise<RT, RE>) | null,
  ): Promise<RT, E | RE>;

  catch<RE>(
    onrejected: ((_: E) => T | Promise<T, RE>) | null,
  ): Promise<T, RE>;

  finally(
    onfinally: (() => void) | null,
  ): Promise<T, E>;
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

  /**
   * @todo Document the "all" method on the "PromiseConstructor"
   */
  all<T extends unknown[] | []>(values: T): Promise<{ [P in keyof T]: ResolveType<T[P]> }, RejectType<T[number]>>;
}

export declare var Promise: PromiseConstructor;

declare type ResolveType<T> = T extends Promise<infer X, any> ? X : never;
declare type RejectType<T> = T extends Promise<any, infer X> ? X : never;

declare type AssertResolves<T extends Promise<U, any>, U extends ResolveType<V>, V = T> = any;
declare type AssertRejects<T extends Promise<any, U>, U extends RejectType<V>, V = T> = any;
