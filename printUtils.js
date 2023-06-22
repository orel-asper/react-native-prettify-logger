// printUtils.js

import { colors, emojis } from './constants.js';
import { getType } from './typeUtils.js';

export function printWithColor(value, color) {
    const type = getType(value);
    const emoji = emojis.get(type) || '';
    console.log(emoji, color, value, colors.get('Reset'));
}

export function printPromise(promise) {
    promise
        .then(result => printWithColor(`Promise resolved: ${result}`, colors.get('FgGreen')))
        .catch(error => printWithColor(`Promise rejected: ${error}`, colors.get('FgRed')));
}

export function printObject(object, indent = '') {
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
