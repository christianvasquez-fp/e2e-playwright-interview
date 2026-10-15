import {expect, test} from '@playwright/test';
import {Login} from '../page-objects/Login';

test.describe('Automaty', () => {
  test.describe('Login', () => {
    let login: Login;

    test.beforeEach(async ({page}) => {
      login = new Login(page);
      await login.goto();
    });

    test('should login with valid credentials', async () => {
      await login.signIn('admin', 'admin');

      await expect(login.welcomeHeading).toBeVisible({timeout: 3000});
    });

    test('should not login with invalid credentials', async () => {
      await login.signIn('admin', 'admin123');

      await expect(login.alert).toBeVisible();
    });

    test('should sign out after logging in', async ({page}) => {
      await login.signIn('admin', 'admin');
      await expect(login.welcomeHeading).toBeVisible({timeout: 6000});

      await page.locator('#logout-btn').click();
      await expect(page.locator('#title-login')).toBeVisible();
    });
  });

  test.describe('Students', () => {
    test('should register a student with valid information', async ({page}) => {
      await page.goto('https://automaty-gd3cb.ondigitalocean.app/');
      await page.locator('#menu-students').click();
      await page.waitForTimeout(1000);

      await page.locator('#firstName').fill('Juan');
      await page.locator('#lastName').fill('Perez');
      await page.locator('#email').fill('juan.perez@example.com');
      await page.locator('#gender-female input').check();
      await page.locator('#phone').fill('8095551234');
      await page.locator('#province-autocomplete').click();
      await page.getByRole('option', {name: 'Santo Domingo'}).click();

      await page.locator('form button[type="submit"]').click();

      await expect(page.getByText('Thanks for applying Juan.')).toBeVisible();
    });

    test('should display validation errors when submitting empty student form', async ({page}) => {
      await page.goto('https://automaty-gd3cb.ondigitalocean.app/');
      await page.locator('#menu-students').click();
      await page.waitForTimeout(1000);

      await page.locator('#register').click();

      await expect(page.getByText('First Name must have at least 1 character')).toBeVisible();
      await expect(page.getByText('Last Name must have at least 1 character')).toBeVisible();
      await expect(page.getByText('Invalid email')).toBeVisible();
      await expect(page.getByText('Phone is invalid')).toBeVisible();
      await expect(page.getByText('Invalid province')).toBeVisible();
    });
  });

  test.describe('Contacts', () => {
    test('should upload contacts csv, sort table, and clear contacts', async ({page}) => {
      await page.goto('https://automaty-gd3cb.ondigitalocean.app/');
      await page.locator('#menu-upload').click();
      await page.waitForTimeout(1000);

      await expect(page.getByText(/There are no contacts to show/i)).toBeVisible();

      const csvContent = [
        'id, name, phone, email',
        '1, John, +1 (809) 555-5555, john@gmail.com',
        '2, Juan, +1 (809) 222-2222, juan@aol.com',
        '3, Joseph, +1 (809) 333-3333, joseph@hotmail.com',
      ].join('\n');

      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.getByRole('button', {name: 'Upload'}).click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles({
        name: 'contacts.csv',
        mimeType: 'text/csv',
        buffer: Buffer.from(csvContent),
      });

      await expect(page.locator('tbody tr')).toHaveCount(3);
      await expect(page.locator('tbody tr').first()).toContainText('John');

      await page.locator('thead th').nth(1).click();
      await expect(page.locator('tbody tr').first()).toContainText('John');

      await page.locator('thead th').nth(1).click();
      await expect(page.locator('tbody tr').first()).toContainText('Juan');

      await page.getByRole('button', {name: 'Clear'}).click();
      await expect(page.getByText(/There are no contacts to show/i)).toBeVisible();
    });

    test('should show validation errors when uploading invalid contacts csv', async ({page}) => {
      await page.goto('https://automaty-gd3cb.ondigitalocean.app/');
      await page.locator('#menu-upload').click();
      await page.waitForTimeout(1000);

      const invalidCsvContent = [
        'id, name, phone, email',
        '1, , 123, not-an-email',
      ].join('\n');

      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.getByRole('button', {name: 'Upload'}).click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles({
        name: 'invalid-contacts.csv',
        mimeType: 'text/csv',
        buffer: Buffer.from(invalidCsvContent),
      });

      await expect(page.getByText(/Error: name must be at least 1 character long/i)).toBeVisible();
      await expect(page.getByText(/Error: phone must be greater than 5 characters long/i)).toBeVisible();
      await expect(page.getByText(/Error: invalid email/i)).toBeVisible();
    });
  });
});
