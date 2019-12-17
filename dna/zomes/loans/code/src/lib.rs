#![feature(proc_macro_hygiene)]

use hdk::holochain_core_types::{dna::entry_types::Sharing, entry::Entry};
use hdk::prelude::*;
use hdk::{entry_definition::ValidatingEntryType, error::ZomeApiResult};

use hdk::holochain_json_api::{error::JsonError, json::JsonString};

use hdk::holochain_persistence_api::cas::content::Address;

use hdk_proc_macros::zome;

// see https://developer.holochain.org/api/latest/hdk/ for info on using the hdk library

// This is a sample zome that defines an entry type "MyEntry" that can be committed to the
// agent's chain via the exposed function create_my_entry

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
struct LoanRequest {
    item_address: Address,
    borrower_address: Address,
}

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
struct Loan {
    item_address: Address,
    borrower_address: Address,
    return_by: i64,
}

#[zome]
mod loans {

    #[init]
    fn init() {
        Ok(())
    }

    #[validate_agent]
    pub fn validate_agent(validation_data: EntryValidationData<AgentId>) {
        Ok(())
    }

    #[entry_def]
    fn loan_request_def() -> ValidatingEntryType {
        entry!(
            name: "loan_request",
            description: "a request that a user has created when wanting to borrow someones item",
            sharing: Sharing::Public,
            validation_package: || {
                hdk::ValidationPackageDefinition::Entry
            },
            validation: | _validation_data: hdk::EntryValidationData<LoanRequest>| {
                Ok(())
            },
            links: [
                to!(
                    "loan_request",
                    link_type: "owner_of_item_requested",
                    validation_package: || {
                        hdk::ValidationPackageDefinition::ChainFull
                    },
                    validation: | _validation_data: hdk::LinkValidationData | {
                        Ok(())
                    }
                )
            ]
        )
    }

    #[entry_def]
    fn loan_def() -> ValidatingEntryType {
        entry!(
            name: "loan",
            description: "a loan entry created when a request to borrow is accepted by the owner",
            sharing: Sharing::Public,
            validation_package: || {
                hdk::ValidationPackageDefinition::Entry
            },
            validation: | _validation_data: hdk::EntryValidationData<Loan>| {
                Ok(())
            },
            links: [
                to!(
                    "loan",
                    link_type: "owner_of_item_loaned",
                    validation_package: || {
                        hdk::ValidationPackageDefinition::ChainFull
                    },
                    validation: | _validation_data: hdk::LinkValidationData | {
                        Ok(())
                    }
                )
            ]
        )
    }

    #[zome_fn("hc_public")]
    fn request_to_borrow(loan_request: LoanRequest) -> ZomeApiResult<Address> {
        //creating the request entry
        let entry = Entry::App("loan_request".into(), loan_request.into());
        let address = hdk::commit_entry(&entry)?;
        // call get_owner function from book zome

        // create a link from owner_of_item to loan_request

        Ok(address)
    }

    #[zome_fn("hc_public")]
    fn get_loan_requests() -> ZomeApiResult<Vec<ZomeApiResult<GetEntryResult>>> {
        //get all loan requests for the user
        //hdk::get_entry(&address)
        Ok(vec![])
    }

    #[zome_fn("hc_public")]
    fn create_loan(_loan_request_address: Address, _return_by: i64) -> ZomeApiResult<()> {
        //create a loan entry
        /*         let entry = Entry::App("loan".into(), entry.into());
               let address = hdk::commit_entry(&entry)?;
        */        //create a link to the owner of the loan (and also one to the borrower?)

        Ok(())
    }
    #[zome_fn("hc_public")]
    fn decline_loan(_loan_request_address: Address) -> ZomeApiResult<()> {
        //mark request as deleted?
        Ok(())
    }
    #[zome_fn("hc_public")]
    fn get_my_loans() -> ZomeApiResult<Vec<ZomeApiResult<GetEntryResult>>> {
        //get a vector of my loans based on my agent address and links
        Ok(vec![])
    }
}
