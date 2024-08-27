async function expectElementToBeDisplayed(selector) {
  const element = await $(selector);
  const isDisplayed = await element.isDisplayed();
  if (!isDisplayed) {
    throw new Error(`Element with selector "${selector}" is not displayed`);
  }
}

module.exports = {
  expectElementToBeDisplayed
};
