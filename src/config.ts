import type { ConfigValues } from 'atom';
import { name } from '../package.json';

export default {
  schema: {
    prefix: {
      description: 'Defines a prefix for exposed commands. Requires a restart on change.',
      type: 'string',
      default: '$',
      order: 1
    },
    includedPackages: {
      title: 'Included Packages',
      description: 'Comma-delimited list of packages that will be included in command exposure.',
      type: 'array',
      default: [],
      order: 2
    },
    excludedPackages: {
      title: 'Excluded Packages',
      description: 'Comma-delimited list of packages that will be excluded from command exposure.',
      type: 'array',
      default: [],
      order: 3
    }
  },

  get(key = ''): ConfigValues {
    return key?.length ? atom.config.get(`${name}.${key}`) : atom.config.get(`${name}`);
  },

  migrate(oldKey: string, newKey: string): void {
    if (!atom.config.get(`${name}.${oldKey}`) || atom.config.get(`${name}.${newKey}`)) {
      return;
    }

    try {
      atom.config.set(`${name}.${newKey}`, atom.config.get(`${name}.${oldKey}`));
    } catch (error) {
      atom.notifications.addWarning(`Failed to migrate configuration, see console for details`);

      return;
    }

    atom.config.unset(`${name}.${oldKey}`);
  },

  unset(key = ''): void {
    const unsetKey = key?.length ? `${name}.${key}` : name;

    atom.config.unset(unsetKey);
  }
};
