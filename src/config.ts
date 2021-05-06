import { ConfigValues } from 'atom';
import meta from '../package.json';
import Logger from './log';

const configSchema = {
};

function getConfig(key = ''): ConfigValues {
  return key?.length ? atom.config.get(`${meta.name}.${key}`) : atom.config.get(`${meta.name}`);
}

function migrateConfig(oldKey: string, newKey: string): void {
  if (atom.config.get(`${meta.name}.${newKey}`)) {
    Logger.warn(`Setting '${newKey}' already exists, skipping migration`);
    return;
  }

  try {
    atom.config.set(`${meta.name}.${newKey}`, atom.config.get(`${meta.name}.${oldKey}`));
  } catch (error) {
    console.log(error);
    atom.notifications.addWarning(`Failed to migrate configuration, see console for details`);

    return;
  }

  Logger.warn(`Setting '${oldKey}' migrated successfully to '${newKey}'`);
  atom.config.unset(`${meta.name}.${oldKey}`);
}

function unsetConfig(key = ''): void {
  key?.length ? atom.config.unset(`${meta.name}.${key}`) : atom.config.unset(`${meta.name}`);
}

export { configSchema, getConfig, migrateConfig, unsetConfig };
