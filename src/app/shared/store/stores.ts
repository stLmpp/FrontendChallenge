import { Injectable } from '@angular/core';
import { isObject } from '../../utils/utils';
import { Store } from './store';
import { StoreSave } from './store-save';

/**
 * @description Service to store all the Stores
 */
@Injectable({ providedIn: 'root' })
export class Stores {
  private readonly _saves = new Map<string, StoreSave>();
  private readonly _stores = new Map<string, Store<any>>();

  private _setFromSave(store: Store<any>, save: StoreSave): void {
    try {
      store.fromJSON(save.json).setUid(save.uid ?? 1);
    } catch {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        // Only log if in development (ng serve)
        // eslint-disable-next-line no-console
        console.error(`Invalid JSON for the store ${store.name}`);
      }
    }
  }

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
    const save = this._saves.get(store.name);
    if (save) {
      this._setFromSave(store, save);
      this._saves.delete(store.name);
    }
    return this;
  }

  /**
   * @description Convert all stores to a single JSON
   * @returns {string}
   */
  toJSON(): string {
    const object: Record<string, StoreSave> = {};
    for (const [name, save] of this._saves) {
      object[name] = save;
    }
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
    let object: Record<string, StoreSave>;
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
    for (const [name, save] of Object.entries(object)) {
      const store = this.get(name);
      if (!store) {
        this._saves.set(name, save);
        continue;
      }
      this._setFromSave(store, save);
    }
    return this;
  }

  reset(): this {
    for (const [, store] of this._stores) {
      store.resetState();
    }
    this._saves.clear();
    return this;
  }
}
