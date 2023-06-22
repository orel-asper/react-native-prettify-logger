import { colors } from "./constants";
import { printObject } from "./printUtils";

const logLocalStorage = () => {
    console.log(colors.get('FgYellow'), '---- Local Storage ----');
    Object.keys(localStorage).forEach(key => {
        console.log(colors.get('FgBlue'), 'Key:', key);
        try {
            printObject(JSON.parse(localStorage.getItem(key) || null));
        } catch (e) {
            console.log(colors.get('FgRed'), 'Could not parse value as JSON:', e);
        }
    });
};

export default logLocalStorage;
