import { colors, emojis } from "./constants";

const getType = (value) => {
    if (value === null) return 'null';
    if (value instanceof Promise) return 'promise';
    if (Array.isArray(value)) return 'array';
    if (value instanceof Error) return 'error';
    return typeof value;
};

export const printWithColor = (value, color) => {
    const type = getType(value);
    const emoji = emojis[type] || '';
    console.log(emoji, color, value, colors.Reset);
};

export const printObject = (object, indent = '') => {
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