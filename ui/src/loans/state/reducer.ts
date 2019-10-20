import { Reducer, AnyAction } from 'redux';
import { Dictionary } from '../../types';
import { LoanRequest, Loan } from '../types';
import { getType } from '../../../node_modules/typesafe-actions/dist/index';
import { getMyLoansAction, getLoanRequestsAction } from './actions';
import { EntryResult, parseEntriesResults } from '../../utils/parse-entries';

export interface LoansState {
  loansRequest: Dictionary<LoanRequest>;
  loans: Dictionary<Loan>;
}

const INITIAL_STATE: LoansState = {
  loansRequest: {},
  loans: {}
};

export const loansReducer: Reducer<LoansState, AnyAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case getType(getLoanRequestsAction.success):
      let entriesResults: EntryResult<LoanRequest>[] = parseEntriesResults(
        action.payload
      );

      let newState = { ...state };

      entriesResults.forEach(entryResult => {
        newState.loansRequest[entryResult.address] = entryResult.entry;
      });

      return newState;
    case getType(getMyLoansAction.success):
      const loansEntries: EntryResult<Loan>[] = parseEntriesResults(
        action.payload
      );

      newState = { ...state };

      loansEntries.forEach(entryResult => {
        newState.loans[entryResult.address] = entryResult.entry;
      });

      return newState;

    default:
      return state;
  }
};
