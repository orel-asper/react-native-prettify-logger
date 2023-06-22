import axios from 'axios';
import { colors } from "./constants";
import { printWithColor, printObject } from "./printUtils";

// Create an instance of axios
const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
    if (isLoggingEnabled && (!requestFilter || requestFilter(config.url))) {
        // Log the request
        printWithColor('---- HTTP Request ----', colors.get('FgYellow'));
        printWithColor(`URL: ${config.url}`, colors.get('FgBlue'));
        printWithColor(`Method: ${config.method.toUpperCase()}`, colors.get('FgBlue'));
        if (config.data) {
            printWithColor('Request Data:', colors.get('FgBlue'));
            printObject(config.data);
        }
    }

    // Always return the config otherwise the request will be blocked
    return config;
});

// Add a response interceptor
axiosInstance.interceptors.response.use((response) => {
    if (isLoggingEnabled && (!requestFilter || requestFilter(response.config.url))) {
        // Log the response
        printWithColor('---- HTTP Response ----', colors.get('FgYellow'));
        printWithColor(`Status: ${response.status}`, colors.get('FgGreen'));
        printWithColor(`Status Text: ${response.statusText}`, colors.get('FgGreen'));
        printWithColor('Response:', colors.get('FgGreen'));
        printObject(response.data);
    }

    // Always return the response otherwise the promise will be blocked
    return response;
}, (error) => {
    // You can also handle and log errors here if you want
    if (isLoggingEnabled) {
        printWithColor('---- HTTP Error ----', colors.get('FgRed'));
        printObject(error);
    }

    // Always reject the promise otherwise the error will be swallowed
    return Promise.reject(error);
});

global.axios = axiosInstance;

export default axiosInstance;
