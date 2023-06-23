import axios from 'axios';
import { colors } from "./constants";
import { printWithColor, printObject } from "./printUtils";

const isLoggingEnabled = true; // Update the value based on your requirement
const requestFilter = null; // Update the filter function if needed

// Create an instance of axios
const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
    if (isLoggingEnabled && (!requestFilter || requestFilter(config.url))) {
        // Log the request
        printWithColor('---- HTTP Request ----', colors.FgYellow);
        printWithColor(`URL: ${config.url}`, colors.FgBlue);
        printWithColor(`Method: ${config.method.toUpperCase()}`, colors.FgBlue);
        if (config.data) {
            printWithColor('Request Data:', colors.FgBlue);
            printObject(config.data);
        }
    }

    return config;
});

// Add a response interceptor
axiosInstance.interceptors.response.use((response) => {
    if (isLoggingEnabled && (!requestFilter || requestFilter(response.config.url))) {
        // Log the response
        printWithColor('---- HTTP Response ----', colors.FgYellow);
        printWithColor(`Status: ${response.status}`, colors.FgGreen);
        printWithColor(`Status Text: ${response.statusText}`, colors.FgGreen);
        printWithColor('Response:', colors.FgGreen);
        printObject(response.data);
    }

    return response;
}, (error) => {
    if (isLoggingEnabled) {
        // Log the error
        printWithColor('---- HTTP Error ----', colors.FgRed);
        printObject(error);
    }

    return Promise.reject(error);
});

const enhancedAxios = axiosInstance;

export default enhancedAxios;
