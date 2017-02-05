/*
 * Logic functions not specific to any app.
 */
'use strict';


function isEmpty(x) {
  if (!x) return true;
  else if (isObject(x)) return Object.keys(x).length === 0;
  else if (isArray(x)) return x.length === 0;
  return false;
}
function isObject(x) {
  return x && typeof x === 'object' && x.constructor === Object;
}
function isArray(x) {
  return x && typeof x === 'object' && x.constructor === Array;
}

function allEmpty() {
  for (var i = 0; i < arguments.length; i++) {
    if (!isEmpty(arguments[i])) return false;
  }
  return true;
}

function anyEmpty() {
  for (var i = 0; i < arguments.length; i++) {
    if (isEmpty(arguments[i])) return true;
  }
  return false;
}

function allEqual() {
  for (var i = 1; i < arguments.length; i++) {
    if (arguments[i] != arguments[i - 1]) return false;
  }
  return true;
}

/**
 * Checks for duplicated arguments. Note that multiple empty arrays or objects are not considered equal.
 */
function anyEqual() {
  return arguments.length === 1 || hasDuplicates(arguments);
}
function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}
