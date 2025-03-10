import { expect, test } from "@playwright/test";

test("user must interact with chat with Input/Output", async ({ page }) => {
  if (!process.env.CI) {
    dotenv.config();
    dotenv.config({ path: path.resolve(__dirname, "../../.env") });
  }

  await page.goto("/");

  await page.waitForTimeout(1000);

  let modalCount = 0;
  try {
    const modalTitleElement = await page?.getByTestId("modal-title");
    if (modalTitleElement) {
      modalCount = await modalTitleElement.count();
    }
  } catch (error) {
    modalCount = 0;
  }

  while (modalCount === 0) {
    await page.getByText("New Project", { exact: true }).click();
    await page.waitForTimeout(5000);
    modalCount = await page.getByTestId("modal-title")?.count();
  }

  await page.getByRole("heading", { name: "Basic Prompting" }).click();
  await page.waitForTimeout(1000);

  await page.getByTitle("fit view").click();
  await page.getByTitle("zoom out").click();
  await page.getByTitle("zoom out").click();
  await page.getByTitle("zoom out").click();

  if (!process.env.OPENAI_API_KEY) {
    //You must set the OPENAI_API_KEY on .env file to run this test
    expect(false).toBe(true);
  }

  await page
    .getByTestId("popover-anchor-input-openai_api_key")
    .fill(process.env.OPENAI_API_KEY ?? "");
  await page.getByText("Playground", { exact: true }).click();
  await page.getByPlaceholder("Send a message...").fill("Hello, how are you?");
  await page.getByTestId("icon-LucideSend").click();
  let valueUser = await page.getByTestId("sender_name_user").textContent();
  let valueAI = await page.getByTestId("sender_name_ai").textContent();

  expect(valueUser).toBe("User");
  expect(valueAI).toBe("AI");

  await page.keyboard.press("Escape");

  await page
    .getByTestId("textarea-input_value")
    .nth(1)
    .fill(
      "testtesttesttesttesttestte;.;.,;,.;,.;.,;,..,;;;;;;;;;;;;;;;;;;;;;,;.;,.;,.,;.,;.;.,~~çççççççççççççççççççççççççççççççççççççççisdajfdasiopjfaodisjhvoicxjiovjcxizopjviopasjioasfhjaiohf23432432432423423sttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestççççççççççççççççççççççççççççççççç,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,!",
    );
  await page.getByTestId("icon-LucideSend").click();
  await page.getByText("Close", { exact: true }).click();

  await page
    .getByTestId("popover-anchor-input-sender_name")
    .nth(1)
    .fill("TestSenderNameUser");
  await page
    .getByTestId("popover-anchor-input-sender_name")
    .nth(0)
    .fill("TestSenderNameAI");

  await page.getByText("Playground", { exact: true }).last().click();
  await page.getByTestId("icon-LucideSend").click();

  valueUser = await page
    .getByTestId("sender_name_testsendernameuser")
    .textContent();
  valueAI = await page
    .getByTestId("sender_name_testsendernameai")
    .textContent();

  expect(valueUser).toBe("TestSenderNameUser");
  expect(valueAI).toBe("TestSenderNameAI");

  expect(
    await page
      .getByText(
        "testtesttesttesttesttestte;.;.,;,.;,.;.,;,..,;;;;;;;;;;;;;;;;;;;;;,;.;,.;,.,;.,;.;.,~~çççççççççççççççççççççççççççççççççççççççisdajfdasiopjfaodisjhvoicxjiovjcxizopjviopasjioasfhjaiohf23432432432423423sttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestççççççççççççççççççççççççççççççççç,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,!",
        { exact: true },
      )
      .isVisible(),
  );
});
