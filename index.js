// Description: This file is loaded automatically by the Node.js interpreter
const colors = {
  Reset: "\x1b[0m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgOrange: "\x1b[33m"
};

// Add emojis
const emojis = {
  string: '📄',
  boolean: '✅',
  number: '🔢',
  object: '📦',
  array: '📚',
  error: '❌',
  undefined: '❓',
  null: '🈳',
  function: '🔧',
  promise: '🤝',
};

const getType = (value) => {
  if (value === null) return 'null';
  if (value instanceof Promise) return 'promise';
  if (Array.isArray(value)) return 'array';
  if (value instanceof Error) return 'error';
  return typeof value;
};

const printWithColor = (value, color) => {
  const type = getType(value);
  const emoji = emojis[type] || '';
  console.log(emoji, color, value, colors.Reset);
};

const printObject = (object, indent = '') => {
  if (object === null || object === undefined) {
    printWithColor(indent + 'null', colors.FgRed);
    return;
  }

  if (object instanceof Error) {
    printWithColor(`Error: ${object.message}`, colors.FgRed);
    return;
  }

  if (object instanceof Promise) {
    object
      .then((result) => {
        printWithColor(`Promise resolved: ${result}`, colors.FgGreen);
      })
      .catch((error) => {
        printWithColor(`Promise rejected: ${error}`, colors.FgRed);
      });
    return;
  }

  console.log(colors.FgMagenta, indent + "{");
  Object.entries(object).forEach(([key, value]) => {
    let formattedValue;
    let valueColor = colors.Reset;
    switch (typeof value) {
      case "string":
        formattedValue = `"${value}"`;
        valueColor = colors.FgYellow;
        break;
      case "boolean":
        formattedValue = value;
        valueColor = value ? colors.FgGreen : colors.FgOrange;
        break;
      case "undefined":
        formattedValue = 'undefined';
        valueColor = colors.FgRed;
        break;
      case "object":
        console.log(indent + `  "${colors.FgBlue}${key}${colors.Reset}": `);
        printObject(value, indent + '  ');
        return;
      default:
        formattedValue = value;
    }
    printWithColor(indent + `  "${colors.FgBlue}${key}${colors.Reset}": ${valueColor}${formattedValue}`, colors.Reset);
  });
  console.log(colors.FgMagenta, indent + "}");
};

global.logger = (...args) => {
  args.forEach(arg => {
    const type = typeof arg;
    if (type === "undefined") {
      printWithColor("undefined", colors.FgRed);
    } else if (arg instanceof Error) {
      printWithColor(`Error: ${arg.message}`, colors.FgRed);
    } else if (arg instanceof Promise) {
      arg
        .then((result) => {
          printWithColor(`Promise resolved: ${result}`, colors.FgGreen);
        })
        .catch((error) => {
          printWithColor(`Promise rejected: ${error}`, colors.FgRed);
        });
    } else if (type === "object") {
      printObject(arg);
    } else {
      printWithColor(arg, colors.FgGreen);
    }
  });
};


export default global.logger;