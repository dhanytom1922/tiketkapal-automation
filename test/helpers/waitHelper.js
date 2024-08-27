async function waitForElement(selector, timeout = 10000) {
  const startTime = new Date().getTime();
  let elementDisplayed = false;

  while (new Date().getTime() - startTime < timeout) {
    try {
      const element = await $(selector); // Pastikan $(selector) mengembalikan elemen
      if (await element.isDisplayed()) {
        elementDisplayed = true;
        break;
      }
    } catch (error) {
      // Element not found yet
    }
    await global.browser.pause(1000); // Wait for 500ms before trying again
  }

  if (!elementDisplayed) {
    throw new Error(`Element with selector "${selector}" not displayed within ${timeout}ms`);
  }
}



module.exports = {
  waitForElement
};
