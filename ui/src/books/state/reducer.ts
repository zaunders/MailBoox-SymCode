import { Reducer, AnyAction } from 'redux';
import { getType } from 'typesafe-actions';

import { Book } from '../types';
import { getMyBooksAction, getBookAction } from './actions';
import { Dictionary } from '../../types';
import {
  parseEntryResult,
  parseEntriesResults,
  EntryResult
} from '../../utils/parse-entries';

export interface BooksState {
  books: Dictionary<Book>;
}

const INITIAL_STATE: BooksState = {
  books: {}
};

export const booksReducer: Reducer<BooksState, AnyAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case getType(getMyBooksAction.success):
      const entriesResults: EntryResult<Book>[] = parseEntriesResults(
        action.payload
      );

      const newState = { ...state };

      entriesResults.forEach(entryResult => {
        newState.books[entryResult.address] = entryResult.entry;
      });

      return newState;
    case getType(getBookAction.success):
      const entryResult = parseEntryResult(action.payload);

      if (!entryResult) return state;

      return {
        ...state,
        [entryResult.address]: entryResult.entry
      };
    default:
      return state;
  }
};

export default counter;
