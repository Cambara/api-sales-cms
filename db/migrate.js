/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');

function createMigration(name) {
  exec(
    `npx typeorm migration:create ./db/migrations/"${name}"`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      if (stdout) {
        console.log(stdout);
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
    },
  );
}

const args = process.argv.slice(2);
const [command, name] = args;
const commandExample = 'Commands:\n migrate:create <name>';

switch (command) {
  case 'migrate:create':
    if (!name || name.trim() === '') {
      console.log(commandExample);
      break;
    }
    createMigration(name);
    break;
  default:
    console.log(commandExample);
}
