import { BehaviorSubject, Observable, pluck } from 'rxjs';
import { isFunction } from '../../utils/utils';
import { Stores } from './stores';

/**
 * @template T
 * @description Helper to manage state
 */
export abstract class Store<T extends Record<any, any>> {
  protected constructor(public stores: Stores, public readonly name: string, private readonly initialState: T) {
    this._state$ = new BehaviorSubject<T>(initialState);
    this.state$ = this._state$.asObservable();
    stores.add(this);
  }

  private readonly _state$: BehaviorSubject<T>;
  private _uid = 1;

  readonly state$: Observable<T>;

  /**
   * @description Set the state
   * @param {T} state
   * @returns {this}
   */
  setState(state: T): this {
    this._state$.next(state);
    return this;
  }

  /**
   * @description Update the state with partial value of callback
   * @param {Partial<T> | ((oldState: T) => T)} partial
   * @returns {this}
   */
  updateState(partial: Partial<T> | ((oldState: T) => T)): this {
    const state = { ...this._state$.value };
    const update = isFunction(partial) ? partial : (oldState: T) => ({ ...oldState, ...partial });
    this._state$.next(update(state));
    return this;
  }

  /**
   * @description Select the complete state
   * @returns {Observable<T>}
   */
  selectState(): Observable<T>;
  /**
   * @description Select the state partially
   * @param {K} key
   * @returns {Observable<T[K]>}
   */
  selectState<K extends keyof T>(key: K): Observable<T[K]>;
  selectState<K extends keyof T>(key?: K): Observable<T> | Observable<T[K]> {
    if (key) {
      return this.state$.pipe(pluck(key));
    }
    return this.state$;
  }

  /**
   * @description Get a snapshot of the state
   * @returns {T}
   */
  getState(): T;
  /**
   * @description Get a partial snapshot of the state
   * @param {K} key
   * @returns {T[K]}
   */
  getState<K extends keyof T>(key: K): T[K];
  getState<K extends keyof T>(key?: K): T | T[K] {
    const state = { ...this._state$.value };
    if (key) {
      return state[key];
    }
    return state;
  }

  /**
   * @description Get the current unique ID
   * @returns {number}
   */
  currentUid(): number {
    return this._uid;
  }

  /**
   * @description Get a unique ID for the store
   * @returns {number}
   */
  nextUid(): number {
    return this._uid++;
  }

  /**
   * @description Used by the Stores to set the initial uid
   * @param {number} uid
   * @returns {this}
   */
  setUid(uid: number): this {
    this._uid = uid;
    return this;
  }

  /**
   * @description Reset the state to its initial value
   * @returns {this}
   */
  resetState(): this {
    return this.setState(this.initialState);
  }
}
