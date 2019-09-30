# Mailboox - A distributed liberary powered by Holochain

## Application synopsis
Enter the books that are in your bookshelf in order to make them visible to your community. Users can request to borrow books from each other and if possible the owner can put the book in his/her Mailbox in order to make it easily available for the borrower to pick-up. 

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
