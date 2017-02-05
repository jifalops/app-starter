/*
 * Simple logging utility.
 */
'use strict';

/*
 * Global logging trigger.
 * Logging a message via `LOG && log.v('x');` allows minification
 * tools to omit logging lines altogether when LOG is false.
 */
const LOG = true;

var log = {};

log.ASSERT = 1;
log.ERROR = 2;
log.WARN = 3;
log.INFO = 4;
log.DEBUG = 5;
log.VERBOSE = 6;

log.setLevel = function(level) {
  if (level >= log.ASSERT)  { log.a = console.assert.bind(window.console); }
  else { log.a = function() {} }
  if (level >= log.ERROR)   { log.e = console.error.bind(window.console); }
  else { log.e = function() {} }
  if (level >= log.WARN)    { log.w = console.warn.bind(window.console); }
  else { log.w = function() {} }
  if (level >= log.INFO)    { log.i = console.info.bind(window.console); }
  else { log.i = function() {} }
  if (level >= log.DEBUG)   { log.d = console.debug.bind(window.console); }
  else { log.d = function() {} }
  if (level >= log.VERBOSE) { log.v = console.log.bind(window.console); }
  else { log.v = function() {} }
  log.level = level;
};

log.setLevel(log.VERBOSE);
