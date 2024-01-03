import { Builder, By, Key, until, Browser } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

describe("Sample Selenium WebDriver Test", () => {
  let driver;

  beforeEach(async () => {
    try {
      driver = new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(new chrome.Options().headless())
        .build();
      console.log("WebDriver initialized successfully");
    } catch (error) {
      console.error("Error initializing WebDriver:", error);
      console.error("Additional information:", error.message);
      throw error;
    }
  });

  test('should open Google homepage and search for "Jest"', async () => {
      await driver.get("https://www.google.com");
      const searchInput = await driver.findElement(By.name("q"));
      await searchInput.sendKeys("Jest", Key.RETURN);
      await driver.wait(until.titleContains("Jest"), 10000); 
      const pageTitle = await driver.getTitle();
      expect(pageTitle).toContain("Jest");
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
      console.log("WebDriver closed successfully");
    }
  });
});

