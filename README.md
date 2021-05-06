# expose-commands

> Exposes package commands to the Developer Tools console

[![apm](https://flat.badgen.net/apm/license/expose-commands)](https://atom.io/packages/expose-commands)
[![apm](https://flat.badgen.net/apm/v/expose-commands)](https://atom.io/packages/expose-commands)
[![apm](https://flat.badgen.net/apm/dl/expose-commands)](https://atom.io/packages/expose-commands)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/atom-expose-commands)](https://circleci.com/gh/idleberg/atom-expose-commands)
[![David](https://flat.badgen.net/david/dep/idleberg/atom-expose-commands)](https://david-dm.org/idleberg/atom-expose-commands)

Let's get this straight from the beginning: chance are that **you don't need this package**. It's aimed at the top 1% of the weirdest Atom users out there or, more likely, Atom developers. As the tagline suggests, it lets you package commands to the built-in console – who even does that? Seriously!

## Installation

Install `expose-commands` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install expose-commands`

### GitHub

Change to your Atom packages directory:

```bash
# Windows
$ cd %USERPROFILE%\.atom\packages

# Linux & macOS
$ cd ~/.atom/packages/
```

Clone the repository as `expose-commands`:

```bash
$ git clone https://github.com/idleberg/atom-expose-commands expose-commands
```

## Usage

Package commands are exposed to the console on activation. There are a few things to keep in mind before you can run these:

1. Commands are provided as `packageName.commandName` and always [camel cased](https://www.wikiwand.com/en/Camel_case)
2. Commands are prefixed with `$`
3. Commands are asynchronous

**Examples:**

```js
// welcome:show
await $welcome.show();

// set-syntax:CoffeeScript
await $setSyntax.coffeeScript();

// set-syntax:SCSS
await $setSyntax.scss();

// NSIS:show-version
await $nsis.showVersion();
```

:warning: At this point only commands with alphanumeric characters and dashes are supported

## License

This work licensed under [The MIT License](https://opensource.org/licenses/MIT)
