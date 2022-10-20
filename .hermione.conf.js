module.exports = {
  baseUrl: 'http://127.0.0.1:3000',
  gridUrl: 'http://127.0.0.1:4444/wd/hub',
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  },
  plugins: {
    'selenium-standalone-runner': true
  }
}