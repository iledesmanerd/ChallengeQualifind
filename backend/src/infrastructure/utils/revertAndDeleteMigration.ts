import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execPromise = promisify(exec);

const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations');

const revertMigrationAndDelete = async () => {
  try {
    // Revert the latest migration
    const { stdout, stderr } = await execPromise('ts-node node_modules/typeorm/cli.js migration:revert -d src/infrastructure/data-source.ts');
    console.log(`Migration reverted: ${stdout}`);
    if (stderr) {
      console.error(`Error reverting migration: ${stderr}`);
      return;
    }

    // Get the latest migration file
    const files = await fs.promises.readdir(MIGRATIONS_DIR);

    if (files.length === 0) {
      console.log('No migration files found.');
      return;
    }

    const latestMigration = files[files.length - 2];
    const filePath = path.join(MIGRATIONS_DIR, latestMigration);

    // Delete the latest migration file
    await fs.promises.unlink(filePath);
    console.log(`Deleted migration file: ${latestMigration}`);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

revertMigrationAndDelete();
