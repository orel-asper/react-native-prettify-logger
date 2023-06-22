// typeUtils.js

export function getType(value) {
    switch (true) {
        case value === null: return 'null';
        case value instanceof Promise: return 'promise';
        case Array.isArray(value): return 'array';
        case value instanceof Error: return 'error';
        default: return typeof value;
    }
}
