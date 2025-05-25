import { test } from "@playwright/test";

test("SEP Successful Checkout", async ({ page }) => {
  /*
        Encode the following credential in base64 format
            username: XX
            password: XXXX
    */
  let encodedCredential = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString("base64");

  // Set the Authorization header in the request
  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${encodedCredential}`,
  });

  // navigate to https://qa.sep.tdtm.cydeo.com/taws
  await page.goto("https://qa.sep.tdtm.cydeo.com/taws");

  // setp 1: start application step
  let firstNameInput = page.locator("//input[@formcontrolname='firstName']");
  await firstNameInput.fill("Muhtar");

  let lastNameInput = page.locator("//input[@formcontrolname='lastName']");
  await lastNameInput.fill("Mahmut");

  let emailInput = page.locator("//input[@formcontrolname='email']");
  await emailInput.fill("muhtar.mahmut@cydeo.com");

  let phoneNumberInput = page.locator(
    "//input[@formcontrolname='phoneNumber']"
  );
  await phoneNumberInput.fill("123456789");

  let howDidYouHearDropDown = page.locator(
    "//mat-label[text()='How did you hear about us?']"
  );
  await howDidYouHearDropDown.click();

  await page.click("//span[text()='Email']");

  let nextButton = page.locator("//button[text()=' Next']");
  await nextButton.click();


  // step 2: Payment Plans
  let upfrontPaymentOption = page.locator("//mat-expansion-panel-header[.//span[text()=' Upfront ']]");
  await upfrontPaymentOption.click();

  let nextButton2 = page.locator("//button[text()='Next']");
  await nextButton2.click();


  // step 3: Review 
  let paymentFrame = page.frameLocator("//iframe[@title='Secure payment input frame']");

  let cardNumberInput = paymentFrame.locator("//input[@id='Field-numberInput']");
  await cardNumberInput.fill(process.env.CARD_NUMBER);

  let expirationDateInput = paymentFrame.locator("//input[@id='Field-expiryInput']");
  await expirationDateInput.fill(process.env.EXPIRATION_DATE);

  let cvcInput = paymentFrame.locator("//input[@id='Field-cvcInput']");
  await cvcInput.fill(process.env.CVC);

  let zipCodeInput = paymentFrame.locator("//input[@id='Field-postalCodeInput']");
  await zipCodeInput.fill(process.env.ZIP_CODE);

  let termsAndConditionsCheckbox = page.locator("//input[@id='defaultCheck2']");
  await termsAndConditionsCheckbox.check();

  let payButton = page.locator("//button[.//span[text()='Pay']]");
  await payButton.click();


});
