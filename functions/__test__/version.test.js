/* eslint-disable no-undef */
const pkVersion = require('../../package.json').version;

test('Get Version', async () => {
  expect(pkVersion).toBe('1.0.0');
});
