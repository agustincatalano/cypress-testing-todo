/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin')

//this is working but one at the time, can't be executed both together
////eslint-disable-next-line no-unused-vars
// module.exports = (on, config) => {
//   require('cypress-mochawesome-reporter/plugin')(on)
//   addMatchImageSnapshotPlugin(on, config)
// }

// module.exports = (on, config) => {
//   addMatchImageSnapshotPlugin(on, config)
// }

const {
  beforeRunHook,
  afterRunHook
} = require('cypress-mochawesome-reporter/lib')

module.exports = (on, config) => {
  on('before:run', async (details) => {
    console.log('override before:run')
    addMatchImageSnapshotPlugin(on, config) //<-- failing to execute. looks like both plugins can't run together on cypress
    await beforeRunHook(details)
  })

  on('after:run', async () => {
    console.log('override after:run')
    await afterRunHook()
  })
}
