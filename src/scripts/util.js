/*
 * Utility functions not specific to any app.
 */
'use strict';

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Replace newlines (\r\n or \n) with "<br/>"
 */
function nl2br(text) {
  return text.replace(/\r?\n/g, "<br/>");
}

/**
 * Replace breaks ("<br/>") with newlines (\r\n or \n)
 */
function br2nl(text, includeCarriageReturn) {
  if (includeCarriageReturn) {
    return text.replace(/<br\s*\/>/g, "\r\n");
  } else {
    return text.replace(/<br\s*\/>/g, "\n");
  }
}

/**
 * Upper-case the first letter of a string
 */
function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function objectToArray(object, deep) {
  deep = deep || false;
  var array = [];
  for (var key in object) {
    if (deep || object.hasOwnProperty(key)) {
      array.push({
        key: key,
        val: object[key]
      });
    }
  }
  return array;
}

function length(x) {
  if (!x) return 0;
  switch (typeof x) {
    case 'object':
      if (x.constructor === Object) return Object.keys(x).length;
      if (x.constructor === Array) return x.length;
      break;
    case 'string':
      return x.length;
  }
  return 0;
}

function repeat(string, count) {
  return count > 0 ? Array(count + 1).join(string) : '';
}

function padLeft(string, char, length) {
  string = string + '';
  return repeat(char, length - string.length) + string;
}

function round(num, places) {
  var e = parseFloat('1' + repeat('0', places));
  return Math.round(parseFloat(num) * e) / e;
}

// http://stackoverflow.com/questions/2631001/javascript-test-for-existence-of-nested-object-key
function hasChild(/*obj, level1, level2, ... levelN*/) {
  var obj = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    if (!obj || !obj.hasOwnProperty(arguments[i])) {
      return false;
    }
    obj = obj[arguments[i]];
  }
  return true;
}

function toggleString(condition, ifTrue, ifFalse) {
  return isEmpty(condition) ? ifFalse : ifTrue;
}

/**
 * Format a timestamp to ISO_8601, YYYY-MM-DD HH:mm:ss.
 */
function formatTimeIso8601(time) {
  var d = new Date(time);
  var s = [d.getFullYear(), padLeft(d.getMonth(), '0', 2), padLeft(d.getDate(), '0', 2)].join('-') +
      ' ' + [padLeft(d.getHours(), '0', 2), padLeft(d.getMinutes(), '0', 2), padLeft(d.getSeconds(), '0', 2)].join(':');
  return s;
}

function milesToKm(miles) {
  return miles * 1.60934;
}

function kmToMiles(km) {
  return km / 1.60934;
}

function makeEnum() {
  var e = {};
  for (var i = 0; i < arguments.length; i++) {
    e[arguments[i]] = arguments[i];
  }
  return Object.freeze(e);
}
