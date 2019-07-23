// Require node modules.
const path = require('path')
const recursive = require('recursive-readdir')

exports.setupFunction = function (client) {

  // Run all the scripts in the setup directory.
  recursive(path.join(__rootdir, 'setup'), (err, setupFiles) => {
    if (err) return console.error(err)
    for (const setupFile of setupFiles) {
      const setupScript = require(setupFile)
      setupScript(client)
    }
  })
}
