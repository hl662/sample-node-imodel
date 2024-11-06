import { IModelHost, StandaloneDb } from "@itwin/core-backend";

async function main() {
	console.log("Hello, world!");
  IModelHost.onBeforeShutdown.addOnce(() => {
    console.log("Goodbye, world!");
  });
	await IModelHost.startup();

	const openedDb = StandaloneDb.openFile("src/assets/house_model.bim");

	// Do something with the openedDb, like execute ECSQL queries
	const queryReader = openedDb.createQueryReader("SELECT * FROM BisCore.Element", undefined, { convertClassIdsToClassNames: true, limit: { count: 5 } });
	while (await queryReader.step()) {
		console.log(queryReader.current[1]); // Logs the className, associated with each classId.
	}

  IModelHost.shutdown();

}
main();
