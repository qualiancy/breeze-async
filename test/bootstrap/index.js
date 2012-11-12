/*!
 * Attach chai to global should
 */

global.chai = require('chai');
global.should = global.chai.should();

/*!
 * Chai Plugins
 */

global.chai.use(require('chai-spies'));
//global.chai.use(require('chai-http'));

/*!
 * Import project
 */

global.async = require('../..');

/*!
 * Helper to load internals for cov unit tests
 */

function req (name) {
  return process.env.async_COV
    ? require('../../lib-cov/async/' + name)
    : require('../../lib/async/' + name);
}

/*!
 * Load unexposed modules for unit tests
 */

global.__async = {};
