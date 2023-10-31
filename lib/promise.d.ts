/**
 * A strongly typed extension to the Promise interface, allowing for type
 * assertions on both the resolved and rejected values.
 */
export interface Promise<T, E = unknown> extends globalThis.Promise<T> {
  /**
   * A strongly typed `.then` statement.
   */
  then<RT, RE = never>(
    onfulfilled: (_: T) => RT | Promise<RT, RE>,
  ): Promise<RT, E | RE>;

  /**
   * A weakly typed `.then` statement.
   */
  then<RT>(
    onfulfilled: (_: T) => PromiseLike<RT>,
  ): Promise<RT, unknown>,

  /**
   * A strongly typed `.catch` statement.
   */
  catch<RE>(
    onrejected: (_: E) => T | Promise<T, RE>,
  ): Promise<T, RE>;

  /**
   * A weakly typed `.catch` statement.
   */
  catch(
    onrejected: (_: E) => PromiseLike<T>
  ): Promise<T, unknown>,

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

  resolve<T>(val: globalThis.Promise<T>): Promise<T, unknown>;

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
  all<T extends unknown[] | []>(values: T):
    Promise<{ [P in keyof T]: ResolveType<T[P]> }, RejectType<T[number]>>;
}

export declare var Promise: PromiseConstructor;

declare type ResolveType<T> = T extends Promise<infer X, any> ? X : never;
declare type RejectType<T> = T extends Promise<any, infer X> ? X : never;

declare type AssertResolves<T extends Promise<U, any>, U extends ResolveType<V>, V = T> = any;
declare type AssertRejects<T extends Promise<any, U>, U extends RejectType<V>, V = T> = any;

/**
 * Upgrade a vanilla Promise to a strongly typed Promise while respecting
 * function overloads.
 *
 * Support is provided for functions with four or fewer arguments.
 *
 * @remarks
 *
 * Credit has to go to the Stack Overflow answer linked below, which provided
 * 90% of the solution for this beautiful piece of magic.
 *
 * {@link https://stackoverflow.com/a/64330561/4000053}
 */
type UpgradePromise<T, E = unknown> =
  T extends
    { (...args: infer A1): PromiseLike<infer R1>; (...args: infer A2): PromiseLike<infer R2>; (...args: infer A3): PromiseLike<infer R3>; (...args: infer A4): PromiseLike<infer R4>; } ?
    { (...args: A1): Promise<R1, E>; (...args: A2): Promise<R2, E>; (...args: A3): Promise<R3, E>; (...args: A4): Promise<R4, E>; } :
  T extends
    { (...args: infer A1): PromiseLike<infer R1>; (...args: infer A2): PromiseLike<infer R2>; (...args: infer A3): PromiseLike<infer R3>; } ?
    { (...args: A1): Promise<R1, E>; (...args: A2): Promise<R2, E>; (...args: A3): Promise<R3, E>; } :
  T extends
    { (...args: infer A1): PromiseLike<infer R1>; (...args: infer A2): PromiseLike<infer R2>; } ?
    { (...args: A1): Promise<R1, E>; (...args: A2): Promise<R2, E>; } :
  T extends
    { (...args: infer A1): PromiseLike<infer R1>; } ?
    { (...args: A1): Promise<R1, E>; } :
  T;
