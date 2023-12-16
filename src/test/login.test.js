import { Builder, By, until } from "selenium-webdriver";
import fs from "fs";
import path from "path";

let driver;

const WEB_PAGE_URL = "https://practicetestautomation.com/practice-test-login/";

const testData = {
  validUsername: "student",
  validPassword: "Password123",
  invalidUsername: "wrongUser",
  invalidPassword: "wrongpass",
};

const login = async (username, password) => {
  await driver.get(WEB_PAGE_URL);
  await driver.findElement(By.id("username")).sendKeys(username);
  await driver.findElement(By.id("password")).sendKeys(password);
  await driver.findElement(By.id("submit")).click();
};

const assertErrorMessage = async (expectedErrorMessage) => {
  const errorMessage = await driver.findElement(By.id("error"));
  await driver.wait(until.elementIsVisible(errorMessage), 10000);
  const errorMessageText = await errorMessage.getText();
  expect(errorMessageText).toEqual(expectedErrorMessage);
};

const setupWebDriver = async (browserName) => {
  return await new Builder().forBrowser(browserName).build();
};
const browsers = ["firefox"];

describe("Login Test", () => {
  afterEach(async () => {
    const currentTestName = expect.getState().currentTestName;
    allure.historyId(`${currentTestName}`);
    const totalAssertions = expect.getState().assertionCalls;
    const passingAssertions = expect.getState().numPassingAsserts;
    const failingAssertions = totalAssertions - passingAssertions;
    if (failingAssertions !== 0) {
      const screenShot = await driver.takeScreenshot();
      const timestamp = new Date()
        .toISOString()
        .replace("T", "_");
      const folderName = "screenshots";
      const folderPath = path.join(".", folderName);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
      const screenshotFileName = `${currentTestName}-${timestamp}.png`;
      const screenshotPath = path.join(folderPath, screenshotFileName);
      fs.writeFileSync(screenshotPath, screenShot, "base64");
      allure.attachment(fs.readFileSync(screenshotPath), "image/png");
    }
    await driver.quit();
  });

  browsers.forEach((browserName) => {
    test(`Login Invalid Username Handling:`, async () => {
      driver = await setupWebDriver(browserName);
      allure.story("Invalid Username Handling");
      allure.description(
        "This test case verifies that an error message is displayed when an invalid username and a valid password are used for login."
      );
      allure.tag("Logintest");
      await allure.step(
        "Step 1: Login with Invalid username and valid password",
        async () => {
          await login(testData.invalidUsername, testData.validPassword);
        }
      );
      await allure.step("Step 2: Verify Error Message", async () => {
        await assertErrorMessage("Your username is invad!");
      });
    });
  });

  browsers.forEach((browserName) => {
    test(`Login Invalid Password Handling:`, async () => {
      driver = await setupWebDriver(browserName);
      allure.story("Invalid Password Handling");
      allure.description(
        "This test case verifies that an error message is displayed when an valid username and a invalid password are used for login."
      );
      allure.tag("Logintest");
      await allure.step(
        "Step 1: Login with valid username and invalid password",
        async () => {
          await login(testData.validUsername, testData.invalidPassword);
        }
      );
      await allure.step("Step 2: Verify Error Message", async () => {
        await assertErrorMessage("Your password is invalid!");
      });
    });
  });

  browsers.forEach((browserName) => {
    test(`Valid UserName and Valid Password handling:`, async () => {
      driver = await setupWebDriver(browserName);
      allure.story("Valid UserName and Valid Password handling");
      allure.description(
        "This test case verifies the successful login with valid credentials, redirects to the success page, and logs out correctly."
      );
      allure.tag("Logintest");
      await allure.step("Step 1: Login with valid credentials", async () => {
        await login(testData.validUsername, testData.validPassword);
      });

      await allure.step("Step 2: Wait for the success page", async () => {
        await driver.wait(until.urlMatches(/logged-in-successfully/), 10000);
        const URL = await driver.getCurrentUrl();
        expect(URL).toEqual(
          "https://practicetestautomation.com/logged-in-successfully/"
        );
      });

      await allure.step("Step 3: Verify success message", async () => {
        const successMessage = await driver.findElement(
          By.className("post-title")
        );
        const successMessageText = await successMessage.getText();
        expect(successMessageText).toEqual("Logged In Successfully");
      });

      await allure.step("Step 4: Click on log out button", async () => {
        await driver.findElement(By.className("wp-block-button__link")).click();
      });

      await allure.step("Step 5: Wait for the home page", async () => {
        await driver.wait(until.urlIs(WEB_PAGE_URL), 10000);
        const logoutURL = await driver.getCurrentUrl();
        expect(logoutURL).toEqual(WEB_PAGE_URL);
      });
    });
  });
});
