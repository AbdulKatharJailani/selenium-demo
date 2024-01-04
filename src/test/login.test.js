import { Builder, By, Key, until, Browser } from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox";


describe("Sample Selenium WebDriver Test", () => {
   test('should open Google homepage and search for "Jest"', async () => {
     let driver = await new Builder()
      .forBrowser(Browser.FIREFOX)
      .setFirefoxOptions(new firefox.Options().headless())
      .build();
      console.log("WebDriver initialized successfully");
      await driver.get("https://www.google.com");
      const searchInput = await driver.findElement(By.name("q"));
      await searchInput.sendKeys("Jest", Key.RETURN);
      await driver.wait(until.titleContains("Jest"), 10000);
      const pageTitle = await driver.getTitle();
      expect(pageTitle).toContain("Jest");    
  });
});





