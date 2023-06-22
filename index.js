import { colors } from "./constants";
import { printWithColor, printPromise, printObject } from "./printUtils";
import fetchWithLogging from "./fetchUtils";
import logLocalStorage from "./localStorageUtils";
import axiosInstance from "./axiosUtils";

let isLoggingEnabled = false;
let requestFilter = null;

const logger = (...args) => {
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

const startLoggingRequests = () => {
  isLoggingEnabled = true;
  requestFilter = null;
  console.log(colors.get('FgGreen'), "Request logging enabled");
};

const stopLoggingRequests = () => {
  isLoggingEnabled = false;
  requestFilter = null;
  console.log(colors.get('FgRed'), "Request logging disabled");
};

const logRequestsWithFilter = (filterFunc) => {
  isLoggingEnabled = true;
  requestFilter = filterFunc;
  console.log(colors.get('FgGreen'), "Request logging enabled with filter");
};

global.logger = logger;
global.fetch = fetchWithLogging;
global.axios = axiosInstance;
global.startLoggingRequests = startLoggingRequests;
global.stopLoggingRequests = stopLoggingRequests;
global.logRequestsWithFilter = logRequestsWithFilter;
global.logLocalStorage = logLocalStorage;

export default logger;
export { startLoggingRequests, stopLoggingRequests, logRequestsWithFilter, logLocalStorage, fetchWithLogging, axiosInstance };
