import { colors } from "./constants";
import { printWithColor, printObject } from "./printUtils";

const isLoggingEnabled = true; // Update the value based on your requirement
const requestFilter = null; // Update the filter function if needed

function logRequest(url, method, data) {
    if (isLoggingEnabled && (!requestFilter || requestFilter(url))) {
        // Log the request
        printWithColor('---- HTTP Request ----', colors.FgYellow);
        printWithColor(`URL: ${url}`, colors.FgBlue);
        printWithColor(`Method: ${method.toUpperCase()}`, colors.FgBlue);
        if (data) {
            printWithColor('Request Data:', colors.FgBlue);
            printObject(data);
        }
    }
}

function logResponse(status, statusText, responseData) {
    if (isLoggingEnabled && (!requestFilter || requestFilter(responseData.config.url))) {
        // Log the response
        printWithColor('---- HTTP Response ----', colors.FgYellow);
        printWithColor(`Status: ${status}`, colors.FgGreen);
        printWithColor(`Status Text: ${statusText}`, colors.FgGreen);
        printWithColor('Response:', colors.FgGreen);
        printObject(responseData);
    }
}

function logError(error) {
    if (isLoggingEnabled) {
        // Log the error
        printWithColor('---- HTTP Error ----', colors.FgRed);
        printObject(error);
    }
}

function sendHttpRequest(method, url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.onload = function () {
            const response = {
                config: { url },
                status: xhr.status,
                statusText: xhr.statusText,
                data: xhr.response
            };

            logResponse(xhr.status, xhr.statusText, response);
            resolve(response);
        };

        xhr.onerror = function () {
            const error = new Error('HTTP request failed');
            logError(error);
            reject(error);
        };

        xhr.ontimeout = function () {
            const error = new Error('HTTP request timeout');
            logError(error);
            reject(error);
        };

        logRequest(url, method, data);

        xhr.send(data);
    });
}

export default {
    get: (url) => sendHttpRequest('GET', url),
    post: (url, data) => sendHttpRequest('POST', url, data),
    put: (url, data) => sendHttpRequest('PUT', url, data),
    delete: (url) => sendHttpRequest('DELETE', url)
};
