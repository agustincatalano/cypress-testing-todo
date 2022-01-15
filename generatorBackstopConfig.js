const fs = require('fs')

// Viewports
const VIEWPORTS_LIST = {
  label: '',
  width: 1000,
  height: 660
}

// Empty template for the backstop.json file
const template = {
  id: 'trelloApp',
  viewports: [],
  scenarios: [],
  paths: {},
  report: ['browser'],
  engine: 'puppeteer',
  engineOptions: {
    args: ['--no-sandbox']
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false
}

// Get the list of the screenshots taken
const screenshotsDir = './cypress/screenshots'

const getFiles = (dir, files_) => {
  const tempFiles = files_ || []
  const files = fs.readdirSync(dir)
  for (const i in files) {
    let name = `${dir}/${files[i]}`
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, tempFiles)
    } else tempFiles.push(name)
  }
  return tempFiles
}

const images = getFiles(screenshotsDir)

const scenarios = images.map((element) => {
  const imagePath = element.slice(element.indexOf('/cypress/screenshots'))
  const deviceAndImageName = element.substring(
    element.indexOf('.js/') + 4,
    element.indexOf('.png')
  )
  const obj = {
    label: `${deviceAndImageName}`,
    url: `${imagePath}`,
    requireSameDimensions: true
  }
  return obj
})

// Override the template's value to the required
template.viewports = [VIEWPORTS_LIST]
template.scenarios = scenarios
template.paths.bitmaps_reference = 'cypress/screenshotsReference'
template.paths.bitmaps_test = 'backstop_data/visualRegression'
// template.paths.engine_scripts = 'cypress/engine_scripts'
// template.paths.html_report = 'backstop_data/html_report'
// template.paths.ci_report = 'backstop_data/ci_report'

//Write to the file backstop.json in the target folder
fs.writeFile('./backstop.json', JSON.stringify(template), (err) => {
  if (err) throw err
})
