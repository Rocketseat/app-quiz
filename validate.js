const responses = require('./responses.json');

const correct = [
  'b',
  'b',
  'b',
  'c',
  'a',
  'c',
  'b',
  'b',
  'c',
  'a',
  'b',
  'b',
  'a',
  'a',
  'd',
  'c',
  'b',
  'b',
  'b',
  'c',
]

let users = {}

responses.forEach(response => {
  users[response.email] = 0;

  response.responses.forEach((answer, i) => {
    if (answer.toLocaleLowerCase() === correct[i]) {
      users[response.email]++;
    }
  })
})

console.log(users)