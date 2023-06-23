import { colors } from "./constants";
import { printObject } from "./printUtils";

const logLocalStorage = () => {
    console.log(colors.FgYellow, '---- Local Storage ----');
    Object.keys(localStorage).forEach(key => {
        console.log(colors.FgBlue, 'Key:', key);
        try {
            printObject(JSON.parse(localStorage.getItem(key) || null));
        } catch (e) {
            console.log(colors.FgRed, 'Could not parse value as JSON:', e);
        }
    });
};

export default logLocalStorage;
