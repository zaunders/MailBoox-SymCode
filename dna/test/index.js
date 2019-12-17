const { Orchestrator, Config } = require("@holochain/tryorama");

process.on("unhandledRejection", error => {
  // Will print "unhandledRejection err is not defined"
  console.error("got unhandledRejection:", error);
});

const dna = Config.dna("../dist/dna.dna.json", "MailBoox");
const mainConfig = Config.gen({
  mail: dna // agent_id="blog", instance_id="blog", dna=dnaBlog
});

const orchestrator = new Orchestrator();

//Scenario 1
orchestrator.registerScenario("creating a book, retrieve it", async (s, t) => {
  const { alice } = await s.players({ alice: mainConfig }, true);

  // Make a call to a Zome function
  // indicating the function, and passing it an input
  const addr = await alice.call("book", "create_book", {
    book: {
      name: "the Foundation",
      author: "Isaac Asimov",
      genre: "Sci-fi",
      blurb:
        "An epic drama around the collapse and return of a galactic civilzation",
      isbn: "0553293354",
      book_owner: useradress
    }
  });
  console.log(addr);
  t.ok(addr);

  //getting the book we just entered
  const result = await alice.call("book", "get_book", { address: addr });
  console.log(result);

  // check for equality of the actual and expected results
  const book = JSON.parse(result.Ok.App[1]);
  t.deepEqual(book, {
    name: "the Foundation",
    author: "Isaac Asimov",
    genre: "Sci-fi",
    blurb:
      "An epic drama around the collapse and return of a galactic civilzation",
    isbn: "0553293354",
    book_owner: useradress
  });
});

//Scenario 2
orchestrator.registerScenario(
  "create two books and retrieve them",
  async (s, t) => {
    const { alice } = await s.players({ alice: mainConfig }, true);

    // Make a call to a Zome function
    // indicating the function, and passing it an input
    const book = await alice.call("book", "create_book", {
      book: {
        name: "the Foundation",
        author: "Isaac Asimov",
        genre: "Sci-fi",
        blurb:
          "An epic drama around the collapse and return of a galactic civilzation",
        isbn: "0553293354",
        book_owner: useradress
      }
    });
    console.log(book);
    t.ok(book);

    const book2 = await alice.call("book", "create_book", {
      book: {
        name: "Debt: the first 5000 years",
        author: "David Greaber",
        genre: "Anthropology",
        blurb:
          "Here anthropologist David Graeber presents a stunning reversal of conventional wisdom: he shows that before there was money, there was debt. For more than 5,000 years, since the beginnings of the first agrarian empires, humans have used elaborate credit systems to buy and sell goods—that is, long before the invention of coins or cash. It is in this era, Graeber argues, that we also first encounter a society divided into debtors and creditors.",
        isbn: "9781612194196",
        book_owner: useradress
      }
    });
    console.log(book2);
    t.ok(book2);

    //getting a vector with all my books
    const result = await alice.call("book", "get_my_books", {});
    console.log(result);

    // check for equality of the actual and expected results
    t.deepEqual(result, { Ok: { App: [] } });
  }
);


// Run all registered scenarios as a final step, and gather the report,
// if you set up a reporter
orchestrator.run().then(console.log);
