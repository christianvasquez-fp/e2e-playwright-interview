# End-To-End Playwright Interview

End-To-End testing suite against [Automaty](https://automaty-gd3cb.ondigitalocean.app/) built with Playwright.

## Getting started

1. Make a copy of the `example.env` file and rename it to `.env` and setup the values that are missing. You can find the `BASE_URL` near the `About` section at the top right hand side of the code explorer on GitHub.
2. Install dependencies:

```bash
pnpm install
```

3. Install the official Playwright [extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright).

## Running the tests

```bash
# Headless run
pnpm test

# Repeat tests 10 times to detect flakiness
pnpm test:flaky

# Interactive UI mode
pnpm gui
```

After a headless run, an HTML report is generated automatically.

## Interview Instructions

1. Fork this repository.
2. Run the test suite (`pnpm test` and `pnpm run test:flaky`) to identify failing and flaky tests.
3. Fix all bugs, flaky tests, and anti-patterns across the test suite and Page Objects.
4. Look for opportunities to refactor the code using best practices.
5. Submit a Pull Request and perform a thorough code review highlighting the issues found and fixed.
6. Only the `Login` tests require code changes. Both `Student` and `Contacts` only need code review opinions from you.