// import { Builder, By, Key, until, Browser } from "selenium-webdriver";
// import chrome from "selenium-webdriver/chrome";

// describe("Sample Selenium WebDriver Test", () => {
//   let driver;

//   beforeEach(async () => {
//     try {
//       driver = new Builder()
//         .forBrowser(Browser.CHROME)
//         .setChromeOptions(new chrome.Options().headless())
//         .build();
//       console.log("WebDriver initialized successfully");
//     } catch (error) {
//       console.error("Error initializing WebDriver:", error);
//       console.error("Additional information:", error.message);
//       throw error;
//     }
//   });

//   test('should open Google homepage and search for "Jest"', async () => {
//     try {
//       await driver.get("https://www.google.com");
//       const searchInput = await driver.findElement(By.name("q"));
//       await searchInput.sendKeys("Jest", Key.RETURN);
//       await driver.wait(until.titleContains("Jest"), 10000);
//       const pageTitle = await driver.getTitle();
//       expect(pageTitle).toContain("Jest");
//     } catch (error) {
//       console.error("Test failed:", error);
//       throw error;
//     }
//   });

//   afterEach(async () => {
//     try {
//       if (driver) {
//         await driver.quit();
//         console.log("WebDriver closed successfully");
//       }
//     } catch (error) {
//       console.error("Error closing WebDriver:", error);
//       throw error;
//     }
//   });
// });



import { Builder, By, Key, until, Browser } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

describe("Sample Selenium WebDriver Test", () => {
  let driver;

  beforeEach(() => {
    return new Promise((resolve, reject) => {
      try {
        driver = new Builder()
          .forBrowser(Browser.CHROME)
          .setChromeOptions(new chrome.Options().headless())
          .build();
        console.log("WebDriver initialized successfully");
        resolve();
      } catch (error) {
        console.error("Error initializing WebDriver:", error);
        console.error("Additional information:", error.message);
        reject(error);
      }
    });
  });

  test('should open Google homepage and search for "Jest"', () => {
    return driver.get("https://www.google.com")
      .then(() => driver.findElement(By.name("q")))
      .then(searchInput => searchInput.sendKeys("Jest", Key.RETURN))
      .then(() => driver.wait(until.titleContains("Jest"), 10000))
      .then(() => driver.getTitle())
      .then(pageTitle => {
        expect(pageTitle).toContain("Jest");
      })
      .catch(error => {
        console.error("Test failed:", error);
        throw error;
      });
  });

  afterEach(() => {
    return new Promise((resolve, reject) => {
      try {
        if (driver) {
          driver.quit()
            .then(() => {
              console.log("WebDriver closed successfully");
              resolve();
            })
            .catch(error => reject(error));
        } else {
          resolve();
        }
      } catch (error) {
        console.error("Error closing WebDriver:", error);
        reject(error);
      }
    });
  });
});

