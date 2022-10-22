hermione.config.testTimeout(100500)
describe('Страницы', () => {
  const basename = '/hw/store'
  it('страницы имеют адаптивную верстку', async function () {
    await this.browser.setWindowSize(450, 700);

    await this.browser.url(`${basename}/`);
    await this.browser.assertView("adaptive-home", ".Application", {
      allowViewportOverflow: true,
    });

    await this.browser.url(`${basename}/delivery`);
    await this.browser.assertView("adaptive-delivery", ".Application", {
      allowViewportOverflow: true,
    });

    await this.browser.url(`${basename}/contacts`);
    await this.browser.assertView("adaptive-contacts", ".Application", {
      allowViewportOverflow: true,
    });

    await this.browser.url(`${basename}/catalog`);
    await this.browser.assertView("adaptive-catalog", ".Application", {
      allowViewportOverflow: true,
    });

    await this.browser.url(`${basename}/cart`);
    await this.browser.assertView("adaptive-cart", ".Application", {
      allowViewportOverflow: true,
    });
  });
})