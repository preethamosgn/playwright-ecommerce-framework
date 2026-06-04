import fs from "fs";

async function globalTeardown() {
  const storageStatePath = "auth/storageState.json";

  if (fs.existsSync(storageStatePath)) {
    fs.unlinkSync(storageStatePath);
    console.log("Deleted storageState.json after test execution");
  } else {
    console.log("No storageState.json file found for cleanup");
  }
}

export default globalTeardown;
