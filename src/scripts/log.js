/*
 * Simply logging utility.
 */
'use strict';

if (log !== undefined) {
  console.warn('log.js: log is already defined as', log, 'overwriting...');
}

var log = {};

log.ASSERT = 1;
log.ERROR = 2;
log.WARN = 3;
log.INFO = 4;
log.DEBUG = 5;
log.VERBOSE = 6;

log.level = log.VERBOSE;

log.a = function() {
  if (log.level >= log.ASSERT) console.assert.apply(this, arguments);
};
log.e = function() {
  if (log.level >= log.ERROR) console.error.apply(this, arguments);
};
log.w = function() {
  if (log.level >= log.WARN) console.warn.apply(this, arguments);
};
log.i = function() {
  if (log.level >= log.INFO) console.info.apply(this, arguments);
};
log.d = function() {
  if (log.level >= log.DEBUG) console.debug.apply(this, arguments);
};
log.v = function() {
  if (log.level >= log.VERBOSE) console.log.apply(this, arguments);
};
