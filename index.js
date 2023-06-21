const colors = new Map([
  ['Reset', "\x1b[0m"],
  ['FgRed', "\x1b[31m"],
  ['FgGreen', "\x1b[32m"],
  ['FgYellow', "\x1b[33m"],
  ['FgBlue', "\x1b[34m"],
  ['FgMagenta', "\x1b[35m"],
  ['FgOrange', "\x1b[33m"]
]);

const emojis = new Map([
  ['string', '📄'],
  ['boolean', '✅'],
  ['number', '🔢'],
  ['object', '📦'],
  ['array', '📚'],
  ['error', '❌'],
  ['undefined', '❓'],
  ['null', '🈳'],
  ['function', '🔧'],
  ['promise', '🤝']
]);

function getType(value) {
  switch (true) {
    case value === null: return 'null';
    case value instanceof Promise: return 'promise';
    case Array.isArray(value): return 'array';
    case value instanceof Error: return 'error';
    default: return typeof value;
  }
}

function printWithColor(value, color) {
  const type = getType(value);
  const emoji = emojis.get(type) || '';
  console.log(emoji, color, value, colors.get('Reset'));
}

function printPromise(promise) {
  promise
    .then(result => printWithColor(`Promise resolved: ${result}`, colors.get('FgGreen')))
    .catch(error => printWithColor(`Promise rejected: ${error}`, colors.get('FgRed')));
}

function printObject(object, indent = '') {
  if (!object) {
    printWithColor(`${indent}null`, colors.get('FgRed'));
    return;
  }

  if (object instanceof Error) {
    printWithColor(`Error: ${object.message}`, colors.get('FgRed'));
    return;
  }

  if (object instanceof Promise) {
    printPromise(object);
    return;
  }

  console.log(colors.get('FgMagenta'), `${indent}{`);
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'object') {
      console.log(`${indent}  "${colors.get('FgBlue')}${key}${colors.get('Reset')}": `);
      printObject(value, `${indent}  `);
    } else {
      printWithColor(
        `${indent}  "${colors.get('FgBlue')}${key}${colors.get('Reset')}": ${value}`,
        colors.get('FgGreen')
      );
    }
  });
  console.log(colors.get('FgMagenta'), `${indent}}`);
}

global.logger = (...args) => {
  args.forEach(arg => {
    switch (getType(arg)) {
      case 'undefined': printWithColor('undefined', colors.get('FgRed')); break;
      case 'error': printWithColor(`Error: ${arg.message}`, colors.get('FgRed')); break;
      case 'promise': printPromise(arg); break;
      case 'object': printObject(arg); break;
      default: printWithColor(arg, colors.get('FgGreen'));
    }
  });
};

export default global.logger;