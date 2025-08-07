function calcPoints(amount) {
  return amount * 0.01;
}

const assert = require('assert');
assert.strictEqual(calcPoints(100), 1);
assert.strictEqual(calcPoints(250), 2.5);
console.log('All tests passed.');
