import { Injectable } from '@angular/core';
import { isObject } from '../../utils/utils';
import { Store } from './store';

/**
 * @description Service to store all the Stores
 */
@Injectable()
export class Stores {
  private _stores = new Map<string, Store<any>>();

  /**
   * @description Get store by the name
   * @param {string} name
   * @returns {Store<T> | undefined}
   */
  get<T>(name: string): Store<T> | undefined {
    return this._stores.get(name);
  }

  /**
   * @description
   * @param {Store} store
   * @returns {this}
   */
  add(store: Store<any>): this {
    if (this._stores.has(store.name)) {
      throw new Error(`Store with name ${store.name} already exists`);
    }
    this._stores.set(store.name, store);
    return this;
  }

  /**
   * @description Convert all stores to a single JSON
   * @returns {string}
   */
  toJSON(): string {
    const object: Record<string, any> = {};
    for (const [name, store] of this._stores) {
      object[name] = { json: store.toJSON(), uid: store.currentUid() };
    }
    return JSON.stringify(object);
  }

  /**
   * @description Load all stores from JSON
   * @param {string} json
   * @returns {this}
   */
  fromJSON(json: string): this {
    let object: Record<string, any>;
    try {
      object = JSON.parse(json);
    } catch {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        // Only log if in development (ng serve)
        // eslint-disable-next-line no-console
        console.error('Invalid JSON, could not load stores');
      }
      return this;
    }
    if (!isObject(object)) {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        // Only log if in development (ng serve)
        // eslint-disable-next-line no-console
        console.error('Invalid JSON (not an object), could not load stores');
      }
      return this;
    }
    for (const [name, state] of Object.entries(object)) {
      const store = this.get(name);
      if (!store) {
        continue;
      }
      try {
        store.setState(JSON.parse(state.json));
        store.setUid(state.__uid ?? 1);
      } catch {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
          // Only log if in development (ng serve)
          // eslint-disable-next-line no-console
          console.error(`Invalid JSON for the store ${store.name}`);
        }
      }
    }
    return this;
  }

  reset(): this {
    for (const [, store] of this._stores) {
      store.resetState();
    }
    return this;
  }
}
