import { connect } from 'pwa-helpers/connect-mixin';
import { LitElement, property, html } from 'lit-element';
import { store, RootState } from './store';
import { Dictionary } from './types';
import { Book } from './books/types';
import { getMyBooks } from './books/state/actions';

import '@authentic/mwc-circular-progress';
import './books/components/book-list';
import './books/components/create-book';
import './loans/components/loan-request-list';
import {
  getLoanRequests,
  requestLoan,
  acceptLoan,
  declineLoan
} from './loans/state/actions';
import { LoanRequest } from './loans/types';
import { sharedStyles } from './shared-styles';

export class MyApp extends connect(store)(LitElement) {
  @property({ type: Object })
  myBooks!: Dictionary<Book>;
  @property({ type: Object })
  myLoansRequests!: Dictionary<LoanRequest>;

  firstUpdated() {
    store.dispatch(getMyBooks());
    store.dispatch(getLoanRequests());
  }

  stateChanged(state: RootState) {
    this.myBooks = state.books.books;
    this.myLoansRequests = state.loans.loansRequest;
  }

  get styles() {
    return sharedStyles;
  }

  render() {
    return html`
      ${this.myBooks && this.myLoansRequests
        ? html`
            <div class="row">
              <create-book></create-book>
              <div class="column">
                <h2>My books</h2>

                <book-list
                  .books=${this.myBooks}
                  @loan-request=${(e: CustomEvent) =>
                    this.loanRequest(e.detail.bookAddress)}
                ></book-list>
              </div>

              <div class="column">
                <h2>Loans requests</h2>

                <loan-request-list
                  .loanRequests=${this.myLoansRequests}
                  @accept-request=${(e: CustomEvent) =>
                    this.acceptRequest(
                      e.detail.requestAddress,
                      e.detail.returnBy
                    )}
                  @decline-request=${(e: CustomEvent) =>
                    this.declineRequest(e.detail.requestAddress)}
                ></loan-request-list>
              </div>
            </div>
          `
        : html`
            <mwc-circular-progress></mwc-circular-progress>
          `}
    `;
  }

  loanRequest(itemAddress: string) {
    store.dispatch(requestLoan(itemAddress));
  }
  acceptRequest(requestAddress: string, returnBy: number) {
    store.dispatch(acceptLoan(requestAddress, returnBy));
  }
  declineRequest(itemAddress: string) {
    store.dispatch(declineLoan(itemAddress));
  }
}
