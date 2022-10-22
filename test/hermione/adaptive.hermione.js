hermione.config.testTimeout(100500)
describe('Страницы', () => {
  const basename = '/hw/store'
  it('Вёрстка должна адаптироваться под ширину экрана', async function () {
    await this.browser.setWindowSize(450, 700);

    await this.browser.url(`${basename}/`);
    await this.browser.assertView("adaptive-home", ".Application", {
      compositeImage: true,
    });

    await this.browser.url(`${basename}/delivery`);
    await this.browser.assertView("adaptive-delivery", ".Application", {
      compositeImage: true,
    });

    await this.browser.url(`${basename}/contacts`);
    await this.browser.assertView("adaptive-contacts", ".Application", {
      compositeImage: true,
    });

    await this.browser.url(`${basename}/catalog`);
    await this.browser.assertView("adaptive-catalog", ".Application", {
      compositeImage: true,
    });

    await this.browser.url(`${basename}/cart`);
    await this.browser.assertView("adaptive-cart", ".Application", {
      compositeImage: true,
    });
  });
})