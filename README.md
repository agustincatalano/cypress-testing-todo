
Hello there 👋

This is a repo for implement cypress testing/report 

The Trello app is build by https://github.com/filiphric. I will focus only on add cypress tests and reports, and NOT to fix or implement new features to the trello app itself.

eslint will run only on the tests/cypress folder, ignoring the app code. 

#Chai Assertions
#Reporter: mochawesome 

## Installation

`git clone https://github.com/agustincatalano/cypress-testing-todo.git`

`yarn install`

`yarn start`

`cypress-open` to run cypress UI view 

`cy-run-headless-chrome` to run tests on chrome in headless mode and generate reports

`cy-run-headless-firefox` to run tests on firefox in headless mode and generate reports

`test-vr` Run visual testing between the screenshots in "screenshotsReference" folder and the ones that the test generate in the "screenshot" folder. Any changes show up in a visual report.

`vr-cleanup` Delete photos from screenshots folder

`vr-approve`  Approving changes will update your reference files with the results from your last test. Future tests are compared against your most recent approved test screenshots.

 ###### Reports will be generated after run tests in headless mode (chrome or firefox) under the report folder that will be generated automatically when the test ends


## Visual Regresion.
I've implemented [backstop.js](https://garris.github.io/BackstopJS/) and it's very easy to use.
* Run the tests using `cy-run-headless-chrome` script, this will generate the images taken by *cy.screenshot()* and add them to the *screenshot* folder
* If the test you ran looks good, then we are ready for the visual regression tests, run `test-vr` and the report will automatically pop up and show you the images comparison.

Add new test into VR is super easy, just take the screenshot to a particular element o all the page with *cy.screenshot()* and then add the extra scenario into backstop.json file and that's it! 



