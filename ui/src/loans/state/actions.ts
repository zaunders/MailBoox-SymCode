import { createHolochainZomeCallAsyncAction } from '../../../node_modules/@holochain/hc-redux-middleware/build/main/lib/actionCreator';

export const getLoanRequestsAction = createHolochainZomeCallAsyncAction(
  'test-instance',
  'loans',
  'get_loan_requests'
);

export const getMyLoansAction = createHolochainZomeCallAsyncAction(
  'test-instance',
  'loans',
  'get_my_loans'
);

export const requestLoanAction = createHolochainZomeCallAsyncAction(
  'test-instance',
  'loans',
  'request_loan'
);

export const acceptLoanAction = createHolochainZomeCallAsyncAction(
  'test-instance',
  'loans',
  'accept_loan'
);

export const declineLoanAction = createHolochainZomeCallAsyncAction(
  'test-instance',
  'loans',
  'decline_loan'
);

export function getLoanRequests() {
  return (dispatch: (arg0: any) => void) =>
    dispatch(getLoanRequestsAction.create({}));
}

export function getMyLoans() {
  return (dispatch: (arg0: any) => void) =>
    dispatch(getMyLoansAction.create({}));
}

export function requestLoan(itemAddress: string) {
  return (dispatch: (arg0: any) => void) =>
    dispatch(
      requestLoanAction.create({
        item_address: itemAddress
      })
    );
}

export function acceptLoan(loanRequestAddress: string, returnBy: number) {
  return (dispatch: (arg0: any) => void) =>
    dispatch(
      acceptLoanAction.create({
        loan_request_address: loanRequestAddress,
        return_by: returnBy
      })
    );
}

export function declineLoan(loanRequestAddress: string) {
  return (dispatch: (arg0: any) => void) =>
    dispatch(
      declineLoanAction.create({
        loan_request_address: loanRequestAddress
      })
    );
}
