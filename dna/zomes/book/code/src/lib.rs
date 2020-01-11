#![feature(proc_macro_hygiene)]
#[macro_use]
extern crate hdk;
extern crate hdk_proc_macros;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
#[macro_use]
extern crate holochain_json_derive;
use holochain_wasm_utils::api_serialization::{get_links::GetLinksOptions,get_entry::{GetEntryOptions,GetEntryResult}};

use hdk::holochain_core_types::{link::LinkMatch, entry::Entry};
use hdk::{AGENT_ADDRESS, entry_definition::ValidatingEntryType, error::ZomeApiResult};

use hdk::holochain_persistence_api::cas::content::Address;

use hdk_proc_macros::zome;

mod book;
use book::Book;

#[zome]
mod book_zome {

    #[init]
    fn init() {
        Ok(())
    }

    #[validate_agent]
    pub fn validate_agent(validation_data: EntryValidationData<AgentId>) {
        Ok(())
    }

    #[entry_def]
    fn book_entry_def() -> ValidatingEntryType {
        book::definition()
    }

    #[zome_fn("hc_public")]
    fn create_book(book: Book) -> ZomeApiResult<Address> {
        let entry = Entry::App("book".into(), book.into());
        let address = hdk::commit_entry(&entry)?;
        Ok(address)
    }

    #[zome_fn("hc_public")]
    fn get_book(address: Address) -> ZomeApiResult<GetEntryResult> {
        hdk::get_entry_result(&address, GetEntryOptions::default())
    }

    #[zome_fn("hc_public")]
    fn get_my_books() -> ZomeApiResult<Vec<ZomeApiResult<GetEntryResult>>> {
        hdk::get_links_result(
            &AGENT_ADDRESS,
            LinkMatch::Exactly("owner_book"),
            LinkMatch::Any,
            GetLinksOptions::default(),
            GetEntryOptions::default(),
        )
    }
    #[zome_fn("hc_public")]
    fn get_owner(address: Address) -> ZomeApiResult<Address> {
        let book: Book = hdk::utils::get_as_type(address)?;

        Ok(book.book_owner)
    }

}