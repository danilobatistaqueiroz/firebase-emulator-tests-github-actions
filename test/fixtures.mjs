export async function mochaGlobalSetup() {
  console.log('mocha global setup');
}
export async function mochaGlobalTeardown() {
  console.log('mocha global tear down');
  process.exit()
}