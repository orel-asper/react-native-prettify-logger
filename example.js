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