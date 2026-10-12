'use strict'

/**
 * Browser bundle entry: one jQuery runtime, Bootstrap JS (legacy parity with index.js),
 * then the application modules (CommonJS).
 */
const jquery = require('jquery')

globalThis.$ = globalThis.jQuery = jquery

require('bootstrap/dist/js/bootstrap.bundle.js')
require('../../assets/scripts/app.js')
