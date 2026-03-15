import { World, IWorldOptions, BeforeAll, Before, After, setWorldConstructor, ITestCaseHookParameter } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  counters: Record<string, number> = {};

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);

BeforeAll(function () {
  const projectRoot = path.resolve(__dirname, '../../..');
  execSync('npm run seed', { cwd: projectRoot, stdio: 'inherit' });
});

Before(async function (this: CustomWorld) {
  const dbPath = path.resolve(__dirname, '../../../db.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  db.carts = [];
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  this.browser = await chromium.launch();
  this.context = await this.browser.newContext({ baseURL: 'http://localhost:3000' });
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  if (scenario.result?.status === 'FAILED' && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});
