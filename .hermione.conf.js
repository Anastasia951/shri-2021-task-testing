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
    'html-reporter/hermione': {
      path: 'hermione-html-report'
    },
    'hermione-selenium-standalone-runner': true
  },
}