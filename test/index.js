const path = require('path')
const tape = require('tape')

const { Diorama, tapeExecutor, backwardCompatibilityMiddleware } = require('@holochain/diorama')

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('got unhandledRejection:', error);
});

const dnaPath = path.join(__dirname, "../dist/MailBoox-SymCode.dna.json")
const dna = Diorama.dna(dnaPath, 'MailBoox-SymCode')

const diorama = new Diorama({
  instances: {
    alice: dna,
    bob: dna,
  },
  bridges: [],
  debugLog: false,
  executor: tapeExecutor(require('tape')),
  middleware: backwardCompatibilityMiddleware,
})
// hardcode is not a good idea...
const useradress = "QmVkSK5TmPdzGjKUkBBwqrxtcjQ1wA9Ze3a2YSzPU8gxEG"



//Scenario 1
diorama.registerScenario("creating a book, retrieve it", async (s, t, { alice }) => {
  // Make a call to a Zome function
  // indicating the function, and passing it an input
  const addr = await alice.call("book", "create_book", {"book" :{
    "name": "the Foundation",
    "author": "Isaac Asimov",
    "genre": "Sci-fi",
    "blurb": "An epic drama around the collapse and return of a galactic civilzation",
    "isbn": "0553293354",
    "book_owner": useradress
  }})
  console.log(addr)
  t.ok(addr)

  //getting the book we just entered
  const result = await alice.call("book", "get_book", {"address": addr})
  console.log(result)

  // check for equality of the actual and expected results
  t.deepEqual(result, { Ok: { App: [ 'book', '{
    "name": "the Foundation",
    "author": "Isaac Asimov",
    "genre": "Sci-fi",
    "blurb": "An epic drama around the collapse and return of a galactic civilzation",
    "isbn": "0553293354",
    "book_owner": useradress}' ] } })
})




//Scenario 2
diorama.registerScenario("create two books and retrieve them", async (s, t, { alice }) => {
  // Make a call to a Zome function
  // indicating the function, and passing it an input
  const book = await alice.call("book", "create_book", {"book" :{
    "name": "the Foundation",
    "author": "Isaac Asimov",
    "genre": "Sci-fi",
    "blurb": "An epic drama around the collapse and return of a galactic civilzation",
    "isbn": "0553293354",
    "book_owner": useradress
  }})
  console.log(book)
  t.ok(book)

  const book2 = await alice.call("book", "create_book", {"book" :{
  "name": "Debt: the first 5000 years",
  "author": "David Greaber",
  "genre": "Anthropology",
  "blurb": "Here anthropologist David Graeber presents a stunning reversal of conventional wisdom: he shows that before there was money, there was debt. For more than 5,000 years, since the beginnings of the first agrarian empires, humans have used elaborate credit systems to buy and sell goods—that is, long before the invention of coins or cash. It is in this era, Graeber argues, that we also first encounter a society divided into debtors and creditors.",
  "isbn": "9781612194196",
  "book_owner": useradress
  }})
  console.log(book2)
  t.ok(book2)

  //getting a vector with all my books
  const result = await alice.call("book", "get_my_books", {})
  console.log(result)

  // check for equality of the actual and expected results
  t.deepEqual(result, { Ok: { App: [ ] } })
})


diorama.run()



//Questions for the walkthrough: 1. How do I get agent adress? 