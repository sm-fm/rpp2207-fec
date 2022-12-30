let hf = require('../client/src/components/helperFunctions.js').helperFunctions;
test('make sure the query HF works', ()=> {
  const testURL = 'http://localhost:3000/1234';
  const expectedID = '1234';
  expect(hf.getIDFromURL(testURL)).toBe(expectedID);
});