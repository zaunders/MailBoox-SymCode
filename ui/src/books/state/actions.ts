import { createHolochainZomeCallAsyncAction } from '@holochain/hc-redux-middleware';
import { Book } from '../types';

export const getMyBooksAction = createHolochainZomeCallAsyncAction(
  'test-instance',
  'book',
  'get_my_books'
);

export const getBookAction = createHolochainZomeCallAsyncAction(
  'test-instance',
  'book',
  'get_my_books'
);

export const createBookAction = createHolochainZomeCallAsyncAction(
  'test-instance',
  'book',
  'create_book'
);

export function getMyBooks() {
  return (dispatch: (arg0: any) => void) =>
    dispatch(getMyBooksAction.create({}));
}

export function getBook(bookAddress: string) {
  return (dispatch: (arg0: any) => void) =>
    dispatch(
      getBookAction.create({
        address: bookAddress
      })
    );
}

export function createBook(book: Book) {
  return (dispatch: (arg0: any) => void) =>
    dispatch(
      createBookAction.create({
        book: book
      })
    );
}
