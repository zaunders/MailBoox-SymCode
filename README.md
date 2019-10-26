# Mailboox - A distributed liberary powered by Holochain

## Application synopsis
Enter the books that are in your bookshelf in order to make them visible to your community. Users can request to borrow books from each other and if possible the owner can put the book in his/her Mailbox in order to make it easily available for the borrower to pick-up. 


## Why?
Books are long for non-screen-based thought collections and streams that help us live in new worlds and better make sense of this one.

Books are great basis for conversations, great ways to converse and cohere with each other. They go real well with coffee.

Sharing a book is like sharing a story, we learn about each other and relate to each other through these stories. They knit us together.

Books are also trapped in our homes, some of them we like so much that we don't want to part with them, but we'll lend them out, trusting we can find them again when we are looking for them. Others we can probably let go of and simply gift to the next reader.

Peer to peer lending has been happening always I guess. But we are now so many, and we have so much stuff that we can't even keep track of where it is and where it is needed. 

Books are a wonderful start, many other things like tools or vihicles are also just around the corner, ready for action!


## What?

This is a project that was collaboratly started at a hackathon in Copenhagen almost 2 years ago. It is now being brought forward and getting ready to run on a much more mature Holochain engine.

### Some of the app design:
Basic functionality would include people entering the books that are in their bookshelf in order to make them visible to a community. 

People can request to borrow books from each other or give them away if they are not worried about them making their way back to the bookshelf.

A possible mode of distribution could be that the owner can put the book in his/her Mailbox in order to make it easily available for the borrower to pick-up.

**Possible coming steps as of 23 October 2019**:
1. Getting tests working in Try-o-Rama
2. Get the Books zome working
3. Get the Borrowing zome working
4. Connect the UI
5. Integratate into Holoscape (Electron UI and debugging)
6. DeepKey, Personas (and maybe Chat) integration
7. Design and scaffold a tools zome?

**Possible initial interfaces:**
![Possible future design considerations](https://i.imgur.com/DKam8eY.jpg)
*Possible user interfaces: Library & Lending, Collection Pages and Book Circle Sessions*

**Liberary and Lending** would include inputing, listing books and collections *(arranged around locality, interest, project group, community, etc.)*, requesting to borrow and accepting borrow request. 

A **Collections** page could showcase a book collection, have reviews of the books in there by others and contain a live conversation about the collection.

**Book Circle Sessions** could be started to read a book together, offline or online, keeping notes about the process and organizing scheduling and chat.


## How?
A collaborative process that attempts to **work-outloud**. Collaborative coding sessions may be streamed and recorded in order to allow others to follow the learning path to get to where the project is now and to learn for other projects.

One possible exploration of how those sessions might look is described here:
https://hackmd.io/@zaunders/Hk_FdeiIB

We hope to get support for hosting learning sessions through the [Open Learning Collective](https://opencollective.com/open-learning-community#section-about)

First attempts of collaboration can be found here for now:
https://forum.holochain.org/t/coding-together-online-on-october-9th/1066/15

## Past development events
### SymCode #1
This repo was created to be used as a codebase to be worked on in the online holochain event listed here:
https://forum.holochain.org/t/coding-together-online-on-october-9th/1066

The MailBoox application was first created at a Hackathon in Copenhagen in January of 2018 and will hopefully now be brought up to current holochain standards. The repo was created as a fresh repository using holonix version 0.0.30 (which uses hc 0.0.28-alpha1) with the hc init command. All of the old code is included in the OLD_ folders.


## Install using Holonix
get dev environment up and running with Nix Shell
* Install [Nix Shell](https://nixos.org/)
* Go to project folder
* run nix-shell

## Future Implementable features
- [ ] Lending time-outs (Maybe default at 2 months but editable on accepting request)
- [ ] Making borrowing history of the borrower visible to the owner of a book that is requested (return in time reputation)
- [ ] Optical Character Recognition for scanning books (read title, author)
- [ ] Meta-data import (Scrape open repositories for book metadata inmport and linking to outside resources)
- [ ] User reviews - Load published user reviews from the community when looking at a book in the application
- [ ] Geographic constraints, enable people to input their address as GPS coordinates in order to set max-distance in filtering
