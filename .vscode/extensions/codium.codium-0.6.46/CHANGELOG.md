## Unreleased

## 0.6.46

- Added user feedback buttons and form

## 0.6.45

### Feature

- Sub behaviors

## 0.6.44

### Fix

- Scroll to test once linked behavior test is clicked

## 0.6.43

### Fix

- Added login url to open login page failure event
- Renamed generate tests action

## 0.6.42

### Feature

- Add right-click context menu

### Fix

- Hide run tests buttons using unsupported languages

## 0.6.41

### Feature

- Added ability to edit code explanation and update code using it

## 0.6.40

### Fix

- Fix for analytics alias

## 0.6.39

### Fix

- Fixed markdown style in Code Explanation tab

## 0.6.38

### Fix

- Showing error on all tests when getting environment error while running all tests

### Feature

- Run and auto-fix all tests
- Set run and auto-fix as default run option for single test

### UI

- Use markdown for code suggestion content

## 0.6.37

### Feature

- Run and Auto-fix single test

### Fix

- Don't send use mocks on first generate

## 0.6.36

### Fix

- Behavior refresh button was always active after re-generate
- Markdown code block styling improved
- Enhance Python testing with Python extension integration

### Feature

- Add back Write Docstring functionality to the sidebar

## 0.6.35

### Feature

- Add Explain-the-code feature to the left panel
- Show refresh banner after every Apply Code action
- Better error handling for single test generation
- Always show behaviors coverage
- Added error message on generation failure
- Code Analysis -> Code Explanation
- Used markdown in Code Explanation tab
- Diff analysis and test generation for uncommitted changes - updated UX.

## 0.6.34

### Fix

- Keep code suggestions from refreshing after re-generate

## 0.6.33

### Feature

- Add a menu for selected text operations on the left panel

### Fix

- Fixed apply changes to inactive text editor

## 0.6.32

### Feature

- Enhance Code

## 0.6.31

### Feature

- Get docstring from the left panel for every language

### Fix

- Show an error message after users click re-generate but the code is broken because of a manual change or applying bad code suggestions.
- Docstring readiness bugfix

## 0.6.30

### Feature

- Improve left panel - code suggestion and test generation flow

### Fix

- Fixed endless loader in code suggestions tag

## 0.6.29

### Feature

- Added the regenerate tests button to the configuration accordion button
- Added generate docstring to code analysis tab
- Refactor: split observables of addResult
- Give me more tests error handling

### Fix

- Handle add test from behavior null items bug
- Logging bugfixes.

## 0.6.28

### Feature

- Added copy to clipboard button to code analysis

## 0.6.27

### Fix

- Handle refresh behaviors errors
- Add one test from custom behavior instead of two
- Handle add custom test from behavior errors, including timeout
- Handle duplicated behavior added

### Events

- Added event for adding custom behavior

## 0.6.26

### Feature

- Get and apply code suggestions from CodiumAI in any language

### Removed

- Removed the test item quick edit feature

## 0.6.25

### Fix

- Fix bug when getting extension settings for run-tests.

## 0.6.24

### Feature / Fix

- Better handling of errors in JS / TS run-tests mechanism
- Fixed endless loader in code suggestion box when getting empty suggestions result.
- Clearer description in extension settings for run-tests settings.

## 0.6.23

### Feature

- Add support for running tests with react-testing-library framework.

## 0.6.22

### Feature

- Replace existing add custom test with add custom behavior, same as in the behavior list
- Fix package size too large issue.

## 0.6.21

### Feature

- Support for running vitest tests

## 0.6.20

### Feature

- Add remove all suggestions button
- Add copy code button to suggestions

## 0.6.19

### Fix

- CodelensProvider bug

## 0.6.18

### Feature

- New left side bar with code suggestions and behaviors

### Fix

- Support running tests with jest more easily.
- Clearer error messages in case of failing to run tests.

## 0.6.17

### Fix

- Variable instead of function bug fix

## 0.6.16

### Feature

- Add custom behaviors and generate tests for them
- Scroll down by a button click once a test has been generated

## 0.6.15

### Fix

- Add test from behavior sent the wrong configuration parameter
- Rerun tests in quick actions

## 0.6.14

### Feature

- New "Quick Actions" from side bar
- Support generating tests for class methods

### Bug

- Refresh behaviors coverage became active when moving between tabs
- Behavior coverage format changed from percentage to number our of total
- Various bugfixes for run-tests for Javascript / Typescript.

## 0.6.13

### Feature

- Added possibility to add tests from behaviors

### Bug

- Not opening the panel of diagnostic issue was found

### UI

- Test and Suggestions items animation added

## 0.6.12

### Bug

- Fix login bug: users weren't able to re-login after refresh login expired

## 0.6.11

### Fix

- Fix CodiumAI for low-end machines

## 0.6.10

### Feature

- Support more VSCodeium-based IDEs
- Allow running typescript tests, and improve the ability to run javascript tests.

### Fix

- Loader was not spinning when generating tests
- Passed button color fixed

### UI

- Minimal color system with tokens
- New custom test color changed to secondary
- Close configuration once code analysis arrives

## 0.6.9

### Feature

- Generate tests using CodiumAI command or shortcut (cmd+ctrl+c)

## 0.6.8

### Feature

- Added indication for when the behaviors first arrives
- Add demo flow
- Each behavior now displays the linked tests

## 0.6.7

### Feature

- New login page.
- Support login with email.

### Bug

- Long code suggestions are now handled properly

## 0.6.6

### Feature

- "CodiumAI" logo menu, add ability to send request ID.
- Panel ID concatenated to all request IDs
- Add try/except for context fetching.
- Added behaviors coverage with the ability to refresh them once the tests has been changed

### Bug

- Hide logo if window is too small
- UI/UX improvements
- Fix bug with running tests

## 0.6.5

### Feature

- Git-diff tests generation is faster.
- Git-diff toggle is not displayed if the file does not have uncommitted changes.
- Moved framework and testing utility config to the main configuration section

### Bug

- `is_code_snippet` was `false` if regenerate clicked after triggering CodiumAI via selection

## 0.6.4

### Bug

- Fix empty configuration bug

## 0.6.3

### Tech

- Added error log

## 0.6.2

### Tech

- Added error log

## 0.6.1

### Feature

- Added a more generic saving mechanism of global configuration
- Add option to manually edit the test code

### Bug

- Fix current edit item lock

## 0.6.0

### Feature

- Added tab loader animation
- Save framework in the local storage of workspace
- Suggest code fixes if suspicious bag is detected

## 0.5.27

### Feature

- Current env to be shown in codiumate popup.
- Request more code suggestions

## 0.5.26

### Bug

- UI fixes

## 0.5.25

### Feature

- Run tests, get the results and fix if failed. (Javascript: Jets + Mocha)

## 0.5.24

### Bug

- BaseURL bug
- Log in button stopped working from sidebar

## 0.5.23

### Bug

- Function recognized as snippet
- Run single test button displayed when should not

## 0.5.22

### Features

- Open code suggestion diff in a new file
- Users can now easily generate tests with CodiumAI by selecting a code segment, right-clicking, and choosing the "Generate Tests" option. This streamlined process provides a more efficient and user-friendly test creation experience.
- New informative tags for tests

### 0.5.21

### Features

- Introduces the possibility to select N code suggestions and apply them to the code.
  - Being able to select multiple suggestions at once
  - Showing the diff of current code vs. suggested code
  - Being able to automatically apply the suggested cod

## 0.5.20

### Features

- Add Sentry for error reporting
- Support multiple dev environments for Codiumates

## 0.5.19

### Features

- Run tests, get the results and fix if failed.

### Bug

- Tags were not updated after single test regenerated (Regression)

## 0.5.18

### Events

- Fixed generated tests received event with streaming

## 0.5.17

### Features

- Better support for streaming for better user experience
- Send editor_type as "vscode" in order to support extension version cutoff by backend.

## 0.5.16

### Features

- Code Suggestions now tag the category of each suggestion to help you undertand what it is about (eg. correctness, readability, etc.)

## 0.5.15

### Features

- If you suggest a change to a test, you will still be able to use the previous version. Tests history is preserved!

### Bugs

- Tags were not updated after single test regenerated

## 0.5.14

### Bugs

- Race condition: Regenerate or edit a single test before context blob arrives

### Events

- Added copy events to Code Analysis, Code Suggestions (base+suggested) and Generated tests

## 0.5.12

### Features

- Regenerate --> Reflect and regenerate, which means it first reflects the existing test code and using it to regenerate a new test. https://trello.com/c/jMFX5TIk

### Bugs

- Flexible "General Instruction" https://trello.com/c/sCHDL4Sg

### Events

- Code Suggestions events https://trello.com/c/3YVGWfAR
