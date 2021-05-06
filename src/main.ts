import { CompositeDisposable } from 'atom';
import config from './config';
import camelCase from 'camelcase';
import Logger from './log';

const ExposeCommands = {
  config: config.schema,
  subscriptions: new CompositeDisposable(),

  async activate(): Promise<void> {
    Logger.log('Activating package');

    const view: HTMLElement = atom.views.getView(atom.workspace);
    const registeredCommands = Object.keys(atom.commands.registeredCommands);

    console.group('Initial Assignment');
    registeredCommands.map(command => this.exposePackageCommands(view, command));
    console.groupEnd();

    atom.packages.onDidActivatePackage(({name}) => {
      Logger.log(`User activated ${name}`);

      console.group('Activation Assignment');
      registeredCommands
        .filter(command => command.startsWith(name))
        .map(command => this.exposePackageCommands(view, command));
      console.groupEnd();
    });

    atom.packages.onDidDeactivatePackage(({name}) => {
      Logger.log(`User deactivated ${name}`);

      const { prefix } = config.get();
      const className = camelCase(name);
      delete window[`${prefix}${className}`];
    });
  },

  deactivate(): void {
    Logger.log('Deactivating package');

    this.subscriptions?.dispose();
  },

  exposePackageCommands(view: HTMLElement, command: string): void {
    const { prefix } = config.get();
    const [pkg, cmd] = command.split(':');
    const className = camelCase(pkg);
    const methodName = cmd
      ? camelCase(cmd)
      : null;


      if (className && methodName) {
      Logger.log(`Assigning ${command} to ${prefix}${className}.${methodName}`);

      window[`${prefix}${className}`] = window[`${prefix}${className}()`] || {};
      window[`${prefix}${className}`][methodName] = async () => await atom.commands.dispatch(view, command);
    } else if (className) {
      Logger.log(`Assigning ${command} to ${prefix}${className}()`);

      window[`${prefix}${className}`] = async () => await atom.commands.dispatch(view, command);
    }
  }
};

export default ExposeCommands;
