import { colors } from "./constants";
import { printWithColor, printPromise, printObject } from "./printUtils";
import fetchWithLogging from "./fetchUtils";
import logLocalStorage from "./localStorageUtils";
import axiosInstance from "./axiosUtils";
import { getType } from "./typeUtils";

let isLoggingEnabled = false;
let requestFilter = null;

const logger = (...args) => {
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
