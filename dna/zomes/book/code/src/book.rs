use hdk::{
    entry_definition::ValidatingEntryType,
    holochain_core_types::{dna::entry_types::Sharing, validation::EntryValidationData},
    holochain_json_api::{error::JsonError, json::JsonString},
    holochain_persistence_api::cas::content::Address,
};

#[derive(Serialize, Clone, Deserialize, Debug, DefaultJson)]
pub struct Book {
    pub name: String,
    pub author: String,
    pub genre: String,
    pub blurb: String,
    pub isbn: String,
    pub book_owner: Address,
}

pub fn definition() -> ValidatingEntryType {
    entry!(
            name: "book",
            description: "Represents a book as an item source of loan system",
            sharing: Sharing::Public,
            validation_package: || {
                hdk::ValidationPackageDefinition::Entry
            },
    // link
            validation: | validation_data: hdk::EntryValidationData<Book>| {
                match validation_data {
                    EntryValidationData::Create{entry, validation_data: _} => {
                        let book = entry as Book;
                        if book.name.trim().is_empty() {
                            return Err("Name of the book can not be empty".into())
                        }
                        if book.author.trim().is_empty() {
                            return Err("Author of the book can not be empty".into())
                        }

                        if book.genre.trim().is_empty() {
                            return Err("Genre of the book can not be empty".into())
                        }

                        if book.name.trim().is_empty() {
                            return Err("ISBN of the book can not be empty".into())
                        }
                        // how to check Address
                        Ok(())
                    },
                    _ => {
                        Err("the entry is not the type of Book".into())
                    }
                }
            },
              links: [
                from!(
                    "%agent_id",
                    link_type: "owner_book",
                    validation_package: || {
                        hdk::ValidationPackageDefinition::ChainFull
                    },
                    validation: | validation_data: hdk::LinkValidationData | {
                        if let hdk::LinkValidationData::LinkAdd{link, ..} = validation_data {
                            if link.link.tag() == "muffins" {
                                Err("This is the one tag that is not allowed!".into())
                            } else {
                                Ok(())
                            }
                        } else {
                            Ok(())
                        }
                    }
                )
            ]
        )
}