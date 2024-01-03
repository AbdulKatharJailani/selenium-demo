import { Builder, By, Key, until, Browser } from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox";

describe("Sample Selenium WebDriver Test", () => {
  let driver;

  beforeEach(async () => {
    try {
      const firefoxOptions = new firefox.Options();
      firefoxOptions.headless();
      console.log(firefoxOptions);
      driver = await new Builder().forBrowser(Browser.FIREFOX).setFirefoxOptions(firefoxOptions).build();
      console.log("WebDriver initialized successfully");
    } catch (error) {
      console.error("Error initializing WebDriver:", error);
      console.error("Additional information:", error.message);
      throw error;
    }
  });

  test('should open Google homepage and search for "Jest"', async () => {
    try {
      await driver.get("https://www.google.com");
      const searchInput = await driver.findElement(By.name("q"));
      await searchInput.sendKeys("Jest", Key.RETURN);
      await driver.wait(until.titleContains("Jest"), 10000); 

      const pageTitle = await driver.getTitle();
      expect(pageTitle).toContain("Jest");
    } catch (error) {
      console.error("Test failed with error:", error);
      console.error("Additional information:", error.message);
      throw error; 
    }
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
      console.log("WebDriver closed successfully");
    }
  });
});

