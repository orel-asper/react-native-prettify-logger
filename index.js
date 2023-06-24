import { colors } from "./constants";
import { printWithColor, printPromise, printObject } from "./printUtils";
import fetchWithLogging from "./fetchUtils";
import logLocalStorage from "./localStorageUtils";
import axiosInstance from "./axiosUtils";

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

global.logger = logger;
global.fetch = fetchWithLogging;
global.axios = axiosInstance;
global.logLocalStorage = logLocalStorage;

export default logger;
export { logLocalStorage, fetchWithLogging, axiosInstance };
