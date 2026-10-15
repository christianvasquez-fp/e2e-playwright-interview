# End-To-End Playwright Interview

End-To-End testing suite against [Automaty](https://automaty-gd3cb.ondigitalocean.app/) built with Playwright.

## Getting started

1. Make a copy of the `example.env` file and rename it to `.env` and setup the values that are missing.
2. Install dependencies:

```bash
bun install
```

3. Install the official Playwright [extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright).

## Running the tests

```bash
# Headless run
bun run test

# Repeat tests 10 times to detect flakiness
bun run test:flaky

# Interactive UI mode
bun run gui
```

After a headless run, an HTML report is generated automatically.

## Interview Instructions

1. Fork this repository.
2. Run the test suite (`bun run test` and `bun run test:flaky`) to identify failing and flaky tests.
3. Fix all bugs, flaky tests, and anti-patterns across the test suite and Page Objects.
4. Refactor the `Students` and `Contacts` test suites to properly follow the [Page Object Model](https://playwright.dev/docs/pom) pattern.
5. Submit a Pull Request and perform a thorough code review highlighting the issues found and fixed.

## Project structure

Tests follow the [Page Object Model](https://playwright.dev/docs/pom) pattern:

```
├── page-objects/   # Page objects (e.g., Login)
├── tests/          # Test specs (e.g., automaty.spec.ts)
└── playwright.config.ts
```

## CI

A GitHub Actions workflow (`.github/workflows/playwright.yml`) runs the test suite on every push and pull request.