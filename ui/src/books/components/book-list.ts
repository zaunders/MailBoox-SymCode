import { customElement, html, LitElement, property } from 'lit-element';
import { Book } from '../types';
import { sharedStyles } from '../../shared-styles';

import '@authentic/mwc-list';
import '@material/mwc-button';
import { Dictionary } from '../../types';

@customElement('book-list')
export class BookList extends LitElement {
  @property({ type: Object })
  books!: Dictionary<Book>;

  get styles() {
    return sharedStyles;
  }

  renderBook(address: string, book: Book) {
    return html`
      <div class="row">
        <div class="column">
          <h4>${book.name}</h4>
          <span>${book.book_owner}</span>
        </div>

        <mwc-button
          raised
          label="Request loan"
          @click=${() =>
            this.dispatchEvent(
              new CustomEvent('loan-request', {
                detail: { bookAddress: address }
              })
            )}
        ></mwc-button>
      </div>
    `;
  }

  render() {
    return html`
      <mwc-list>
        ${Object.keys(this.books).map(
          bookAddress =>
            html`
              <mwc-list-item>
                ${this.renderBook(bookAddress, this.books[bookAddress])}
              </mwc-list-item>
              <mwc-list-divider></mwc-list-divider>
            `
        )}
      </mwc-list>
    `;
  }
}
