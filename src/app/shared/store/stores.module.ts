import { Inject, Injector, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { Store } from './store';
import { Stores } from './stores';
import { STORES_TOKEN } from './stores.token';

@NgModule()
export class StoresModule {
  constructor(injector: Injector, @Inject(STORES_TOKEN) stores: Type<Store<any>>[]) {
    for (const store of stores) {
      injector.get(store);
    }
  }

  static forRoot(stores: Type<Store<any>>[]): ModuleWithProviders<StoresModule> {
    return {
      ngModule: StoresModule,
      providers: [Stores, ...stores, { provide: STORES_TOKEN, useValue: stores }],
    };
  }
}
