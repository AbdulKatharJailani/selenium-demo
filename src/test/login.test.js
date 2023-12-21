import { Builder, By, Key, until } from "selenium-webdriver";
import firefox from 'selenium-webdriver/firefox';

describe("Sample Selenium WebDriver Test", () => {
  let driver;
  beforeEach(async () => {
    const firefoxOptions = new firefox.Options();
    firefoxOptions.headless();
    driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(firefoxOptions)
      .build();
  });
  test('should open Google homepage and search for "Jest"', async () => {
    await driver.get("https://www.google.com");
    const searchInput = await driver.findElement(By.name("q"));
    await searchInput.sendKeys("Jest", Key.RETURN);
    await driver.wait(until.titleContains("Jest"), 5000);
    const pageTitle = await driver.getTitle();
    expect(pageTitle).toContain("Jest");
  });
});
