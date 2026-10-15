import {Page} from '@playwright/test';
import 'dotenv/config';

export class Login {

  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto(process.env.BASE_URL!);
  }

  async signIn(username: string, password: string) {
    await this.page.getByLabel('Username', {exact: true}).fill(username);
    await this.page.getByLabel('Password', {exact: true}).fill(password);
    this.page.getByRole('button', {name: 'Sign In'}).click();
  }

  get welcomeHeading() {
    return this.page.getByRole('heading', {name: 'Welcome back'});
  }

  get alert() {
    return this.page.getByText(/Wrong credentials/i);
  }
}
