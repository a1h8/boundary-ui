/* eslint-disable no-undef */
const path = require('path');

/**
 *
 * @param {string} screenshotTestDirectory screenshot directory for the specific test suite
 * @param {string} fileName The file name.
 * @returns A full path where to save the screenshot.
 */
exports.generateScreenshotPath = (screenshotTestDirectory, fileName) => {
  const screenshotFormat = '.png';
  const screenshotsRootPath = path.join(__dirname, 'screenshots');
  const screenshotPath = path.join(
    screenshotsRootPath,
    screenshotTestDirectory
  );
  return path.join(screenshotPath, fileName).concat(screenshotFormat);
};

/**
 *
 * @param {string} platform The operating system.
 * @param {string} arch The CPU architecture.
 * @returns A full path where the Desktop Client executable is located.
 */
exports.returnExecutablePath = (platform, arch) => {
  try {
    // Just mac
    if (platform === 'darwin') {
      if (arch === 'x64') {
        // Intel chips
        return 'electron-app/out/Boundary-darwin-x64/Boundary.app/Contents/MacOS/Boundary';
      } else if (arch === 'arm64') {
        // M1 chips
        return 'electron-app/out/Boundary-darwin-arm64/Boundary.app/Contents/MacOS/Boundary';
      } else {
        throw new Error('The test suite is not compatible with your arch.');
      }
    } else {
      throw new Error(
        'The test suite is not compatible with your Platform or Architecture.'
      );
    }
  } catch (error) {
    console.error(error);
  }
};
