import { Builder, By, Key, until } from "selenium-webdriver";

describe("Sample Selenium WebDriver Test", () => {
  let driver;
  beforeEach(async () => {
    driver = await new Builder()
    .usingServer("http://localhost:4444/wd/hub")
    .forBrowser("firefox")
    .withCapabilities({
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['-headless']
      }
    })
    .build();
  });
  afterEach(async()=>{
    await driver.quit();
  })
  test('should open Google homepage and search for "Jest"', async () => {
    await driver.get("https://www.google.com");
    const searchInput = await driver.findElement(By.name("q"));
    await searchInput.sendKeys("Jest", Key.RETURN);
    await driver.wait(until.titleContains("Jest"), 5000);
    const pageTitle = await driver.getTitle();
    expect(pageTitle).toContain("Jest");
  });
});
