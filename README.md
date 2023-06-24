# 📚 Global Logger for React Native

---

## 🎯 Overview

This library provides a global logger for React Native applications. The logger enhances console output with colors and emojis, significantly improving readability and making debugging easier. It supports various types including primitive types, objects, promises, and errors.

Additionally, the library provides functionality to log HTTP requests and responses made with Fetch or Axios, as well as local storage actions.


## ⚙️ Installation

To use this library in your React Native project, just copy the logger code into your main JavaScript file (typically `App.js` or `index.js`).

Then, assign the logger function and additional features to the global object:

```javascript
import logger, {  logLocalStorage, fetchWithLogging, axiosInstance } from 'react-native-prettify-logger';

global.logger = logger;
global.logLocalStorage = logLocalStorage;
global.fetch = fetchWithLogging;
global.axios = axiosInstance;
```

## 🚀 Usage

Once the logger is installed, you can call it from anywhere in your application using `global.logger(...)`. The logger can take any number of arguments and will log them out to the console. It also identifies and appropriately handles different types of values including promises, errors, and objects.

```javascript
global.logger('Hello, world!', 123, { key: 'value' }, new Error('An error occurred!'), Promise.resolve('Promise result!'));
```

### Logging HTTP Requests and Responses

- `global.fetch = fetchWithLogging;`

  This line replaces the global `fetch` function with `fetchWithLogging`. The `fetchWithLogging` function is a wrapper around the standard `fetch` function that logs the request and response details to the console, in addition to performing the usual fetch functionality. This is particularly useful for tracking API calls and their responses during development and debugging.

  Example usage:
  ```javascript
  // Make an API call with fetch and log the request and response details
  global.fetch.get('https://api.example.com/data');
  ```

- `global.axios = axiosInstance;`

  This line assigns an Axios instance configured with request and response logging to the global object, replacing the standard `axios` library. This allows you to make HTTP requests with Axios and have the request and response details logged to the console. Just like `fetchWithLogging`, this is very useful for tracking API calls and their responses during development and debugging.

  Example usage:
  ```javascript
  // Make an API call with axios and log the request and response details
  global.axios.get('https://api.example.com/data');
  ```

### Logging Local Storage Actions

You can log actions performed on the local storage by calling `logLocalStorage()`. The function logs the current state of the local storage.

```javascript
global.logLocalStorage();
```

- `global.logLocalStorage = logLocalStorage;`

  This line assigns the `logLocalStorage` function to the global object, allowing it to be called from anywhere in your application. The `logLocalStorage` function logs the current state of the local storage, which is useful for debugging issues related to data stored in the local storage.

  Example usage:
  ```javascript
  // Log the current state of the local storage
  global.logLocalStorage();
  ```

### Example 
```javascript
//dummy data to check the logger
const dummyData = {
  name: 'John Doe',
  age: 25,
  isMarried: false,
  address: {
    street: '123 Street',
    city: 'New York',
    state: 'NY',
    zipCode: 10001,
  },
  hobbies: ['music', 'movies', 'sports'],
  job: {
    title: 'Frontend Developer',
    company: 'ABC Corp',
  },
  salary: 35000,
  sayHello: function () {
    console.log('Hello');
  },
  walk: () => {
    console.log('Walking...');
  },
  Error: new Error('This is an error'),
  Promise: Promise.resolve('Promise!'),
  undefined: undefined,
  null: null,
};

global.logger(dummyData);
```

![Alt Text](./example_output.png)

### Features

- **String Logging**: Strings are logged with a green color and a 📄 emoji.
- **Number Logging**: Numbers are logged with a green color and a 🔢 emoji.
- **Boolean Logging**:

 Booleans are logged with a green color (for true) or orange (for false), and a ✅ emoji.
- **Object Logging**: Objects are pretty-printed with colored keys and values. Each key-value pair is logged on its own line. A 📦 emoji is used.
- **Array Logging**: Arrays are logged as objects, with indices as keys. A 📚 emoji is used.
- **Error Logging**: Errors are logged with a red color, along with the error message. A ❌ emoji is used.
- **Undefined Logging**: Undefined values are logged with a red color and a ❓ emoji.
- **Null Logging**: Null values are logged with a red color and a 🈳 emoji.
- **Function Logging**: Functions are logged with a green color and a 🔧 emoji.
- **Promise Logging**: Promises are logged with a green color if they resolve, or a red color if they reject. A 🤝 emoji is used.
- **HTTP Request and Response Logging**: HTTP requests and responses made with Fetch or Axios are logged with relevant details.
- **Local Storage Logging**: Local storage actions are logged with the current state of the local storage.

### Customizing the Logger

The logger can be customized by modifying the `colors` and `emojis` objects in the code.

## 🔮 Future Enhancements

- Configurable color schemes.
- Support for custom emojis and icons.
- Output to log files in addition to the console.

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ Contributing

We welcome contributions to improve this library. Please open an issue or submit a pull request on our GitHub repository.

## 👏 Acknowledgements

Thank you to all contributors and users of this library.

---
