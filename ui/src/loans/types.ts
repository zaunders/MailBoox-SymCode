export interface LoanRequest {
  item_address: string;
  borrower_address: string;
}

export interface Loan {
  item_address: string;
  borrower_address: string;
  return_by: number;
}
