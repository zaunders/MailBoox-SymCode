import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../store';
import { html, LitElement, customElement } from 'lit-element';
import { sharedStyles } from '../../shared-styles';
import { Book } from '../types';

import '@material/mwc-textfield';
import '@material/mwc-button';
import { createBook } from '../state/actions';

@customElement('create-book')
export class CreateBook extends connect(store)(LitElement) {
  book: Book = {
    name: '',
    author: '',
    genre: '',
    blurb: '',
    isbn: '',
    book_owner: ''
  };

  get styles() {
    return sharedStyles;
  }

  render() {
    return html`
      <form class="column">
        <mwc-textfield
          label="Name"
          @input=${(e: InputEvent) =>
            (this.book.name = (((e.target as unknown) as { value: string }) &&
              (((e.target as unknown) as { value: string })[
                'value'
              ] as unknown)) as string)}
        ></mwc-textfield>
        <mwc-textfield
          label="Author"
          @input=${(e: InputEvent) =>
            (this.book.author = (((e.target as unknown) as { value: string }) &&
              (((e.target as unknown) as { value: string })[
                'value'
              ] as unknown)) as string)}
        ></mwc-textfield>
        <mwc-textfield
          label="genre"
          @input=${(e: InputEvent) =>
            (this.book.genre = (((e.target as unknown) as { value: string }) &&
              (((e.target as unknown) as { value: string })[
                'value'
              ] as unknown)) as string)}
        ></mwc-textfield>
        <mwc-textfield
          label="blurb"
          @input=${(e: InputEvent) =>
            (this.book.blurb = (((e.target as unknown) as { value: string }) &&
              (((e.target as unknown) as { value: string })[
                'value'
              ] as unknown)) as string)}
        ></mwc-textfield>
        <mwc-textfield
          label="isbn"
          @input=${(e: InputEvent) =>
            (this.book.isbn = (((e.target as unknown) as { value: string }) &&
              (((e.target as unknown) as { value: string })[
                'value'
              ] as unknown)) as string)}
        ></mwc-textfield>
        <mwc-textfield
          label="Book owner"
          @input=${(e: InputEvent) =>
            (this.book.book_owner = (((e.target as unknown) as {
              value: string;
            }) &&
              (((e.target as unknown) as { value: string })[
                'value'
              ] as unknown)) as string)}
        ></mwc-textfield>

        <mwc-button
          raised
          label="Create book"
          ${() => this.createBook()}
        ></mwc-button>
      </form>
    `;
  }

  createBook() {
    store.dispatch(createBook(this.book));
  }
}
