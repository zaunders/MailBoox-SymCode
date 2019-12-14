const { Orchestrator, Config } = require("@holochain/try-o-rama");

process.on("unhandledRejection", error => {
  // Will print "unhandledRejection err is not defined"
  console.error("got unhandledRejection:", error);
});

const dna = Config.dna("../dist/MailBoox-SymCode", "MailBoox");
const mainConfig = Config.gen({
  mail: dna // agent_id="blog", instance_id="blog", dna=dnaBlog
});

const orchestrator = new Orchestrator();

orchestrator.registerScenario("description of example test", async (s, t) => {
  const { alice } = await s.players({ alice: mainConfig });

  // Make a call to a Zome function
  // indicating the function, and passing it an input
  const addr = await alice.call("my_zome", "create_my_entry", {
    entry: { content: "sample content" }
  });
  const result = await alice.call("my_zome", "get_my_entry", {
    address: addr.Ok
  });

  // check for equality of the actual and expected results
  t.deepEqual(result, {
    Ok: { App: ["my_entry", '{"content":"sample content"}'] }
  });
});

// Run all registered scenarios as a final step, and gather the report,
// if you set up a reporter
orchestrator.run().then(console.log);
