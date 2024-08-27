const fs = require('fs');

function createScreenshotDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function saveScreenshot(filePath) {
  const dir = filePath.substring(0, filePath.lastIndexOf('/'));
  createScreenshotDir(dir); // Ensure the directory exists
  await global.browser.saveScreenshot(filePath);
}

module.exports = {
  saveScreenshot
};
// xxx 