// import { colors } from "./constants";
// import { printObject } from "./printUtils";

// const fetchWithLogging = async (input, init, isLoggingEnabled, requestFilter) => {
//     const url = typeof input === 'string' ? input : input.url;

//     if (isLoggingEnabled && (!requestFilter || requestFilter(url))) {
//         // Log the request
//         console.log(colors.get('FgYellow'), '---- HTTP Request ----');
//         console.log(colors.get('FgBlue'), 'URL:', url);
//         if (init && init.method) {
//             console.log(colors.get('FgBlue'), 'Method:', init.method);
//         }
//         if (init && init.body) {
//             console.log(colors.get('FgBlue'), 'Request Body:');
//             printObject(init.body);
//         }
//     }

//     // Make the request
//     const response = await fetch(input, init);

//     if (isLoggingEnabled && (!requestFilter || requestFilter(url))) {
//         // Log the response
//         console.log(colors.get('FgYellow'), '---- HTTP Response ----');
//         console.log(colors.get('FgGreen'), 'Status:', response.status);
//         console.log(colors.get('FgGreen'), 'Status Text:', response.statusText);
//         try {
//             const responseBody = await response.clone().json();
//             console.log(colors.get('FgGreen'), 'Response:');
//             printObject(responseBody);
//         } catch (e) {
//             // Response is not JSON
//             console.log(colors.get('FgRed'), 'Could not parse response as JSON:', e);
//         }
//     }

//     // Return the response
//     return response;
// };

// export default fetchWithLogging;


// work in progress