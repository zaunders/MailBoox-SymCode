/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

declare global {
  interface Window {
    process?: Object;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
  Reducer,
  StoreEnhancer,
  AnyAction
} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';
import { LoansState, loansReducer } from './loans/state/reducer';
import { BooksState, booksReducer } from './books/state/reducer';

// Overall state extends static states and partials lazy states.
export interface RootState {
  loans: LoansState;
  books: BooksState;
}

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(
  f1: StoreEnhancer<Ext0, StateExt0>,
  f2: StoreEnhancer<Ext1, StateExt1>
) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management

import { connect } from '@holochain/hc-web-client';
import { holochainMiddleware } from '../node_modules/@holochain/hc-redux-middleware';

// this url should use the same port set up the holochain container
const url = 'ws://localhost:8888';
const hcWc = connect({ url });

export const store = createStore(
  state => state as Reducer<RootState, AnyAction>,
  devCompose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(holochainMiddleware(hcWc), thunk as ThunkMiddleware<
      RootState,
      AnyAction
    >)
  )
);

// Initially loaded reducers.
store.addReducers({
  loans: loansReducer,
  books: booksReducer
});
