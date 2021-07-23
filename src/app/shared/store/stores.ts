import { Injectable } from '@angular/core';
import { isObject } from '../../utils/utils';
import { Store } from './store';
import { StoreSave } from './store-save';
import { DialogService } from '../dialog/dialog.service';

/**
 * @description Service to store all the Stores
 */
@Injectable({ providedIn: 'root' })
export class Stores {
  constructor(private dialogService: DialogService) {}

  private readonly _saves = new Map<string, StoreSave>();
  private readonly _stores = new Map<string, Store<any>>();

  private _showDialogError(error: string): void {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      // Only log if in development (ng serve)
      this.dialogService.open({
        title: '[Store] Error when trying to load the store',
        content: error,
        buttons: [
          {
            title: 'Close',
            action: matDialogRef => matDialogRef.close(),
          },
        ],
      });
    }
  }

  private _showDialogSuccess(message: string): void {
    this.dialogService.open({
      title: message,
      buttons: [
        {
          title: 'Close',
          action: matDialogRef => matDialogRef.close(),
        },
      ],
    });
  }

  private _setFromSave(store: Store<any>, save: StoreSave): void {
    try {
      store.fromJSON(save.json).setUid(save.uid ?? 1);
    } catch {
      this._showDialogError(`Invalid JSON for the store ${store.name}`);
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
      this._showDialogError('Invalid JSON, could not load stores');
      return this;
    }
    if (!isObject(object)) {
      this._showDialogError('Invalid JSON (not an object), could not load stores');
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
    this._showDialogSuccess('Data loaded successfully');
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
