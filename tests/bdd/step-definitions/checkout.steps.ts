import { Given, Then, BeforeAll } from "@cucumber/cucumber";
import { execSync } from "child_process";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";

BeforeAll(function () {
  execSync("npm run seed", { cwd: process.cwd() });
});

Then(
  "I should be redirected to the login page",
  async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/login\.html/);
  },
);
