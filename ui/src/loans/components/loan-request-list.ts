import { LitElement, property, customElement, html } from 'lit-element';
import { Dictionary } from '../../types';
import { LoanRequest } from '../types';

import '@material/mwc-button';

@customElement('loan-request-list')
export class LoanRequestList extends LitElement {
  @property({ type: Object })
  loanRequests!: Dictionary<LoanRequest>;

  renderLoanRequest(loanRequestAddress: string, loanRequest: LoanRequest) {
    return html`
      <div class="row">
        <div class="column">
          <span>From: ${loanRequest.borrower_address}</span>
          <span>For item: ${loanRequest.item_address}</span>
        </div>

        <mwc-button
          label="Decline"
          @click=${() =>
            this.dispatchEvent(
              new CustomEvent('decline-request', {
                detail: { requestAddress: loanRequestAddress }
              })
            )}
        ></mwc-button>
        <mwc-button
          raised
          label="Accept"
          @click=${() =>
            this.dispatchEvent(
              new CustomEvent('accept-request', {
                detail: { requestAddress: loanRequestAddress, returnBy: Date.now() + 400000 }
              })
            )}
        ></mwc-button>
        <label for="returnby">Return by:</label>

        <input type="date" id="returnby" name="trip-start" />
      </div>
    `;
  }

  render() {
    return html`
      <div class="column">
        ${Object.keys(this.loanRequests).map(loanRequestAddress =>
          this.renderLoanRequest(
            loanRequestAddress,
            this.loanRequests[loanRequestAddress]
          )
        )}
      </div>
    `;
  }
}
