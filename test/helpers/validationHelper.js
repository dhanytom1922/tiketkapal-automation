async function validateMessage(selector, expectedMessage) {
  const element = await $(selector);
  const actualMessage = await element.getText();
  expect(actualMessage).toBe(expectedMessage);
}

module.exports = { validateMessage };
