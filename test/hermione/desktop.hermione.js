hermione.config.testTimeout(100500)
describe('Страницы', () => {
  const basename = '/hw/store'
  it("Страницы главная, доставка и контакты имеют статическое содержимое", async function () {
    await this.browser.setWindowSize(1920, 1080)
    await this.browser.url(`${basename}/`);

    await this.browser.assertView("home", ".Application", {
      allowViewportOverflow: true,
    });

    await this.browser.url(`${basename}/delivery`);
    await this.browser.assertView("delivery", ".Application", {
      allowViewportOverflow: true,
    });

    await this.browser.url(`${basename}/contacts`);
    await this.browser.assertView("contacts", ".Application", {
      allowViewportOverflow: true,
    });
  })
})