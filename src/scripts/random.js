/*
 * Utilities related to random numbers
 */
'use strict';

/** From the MDN examples, inclusive exclusive. */
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Returns a random number between min (inclusive) and
 * max (exclusive), defaulting to +-1.
 */
function randomRange(min, max) {
  if (min === undefined && max === undefined) {
    min = -1;
    max = 1;
  }
  return min + Math.random() * (max - min);
}

/**
 * Returns a random number between -magnitude (inclusive) and
 * +magnitude (exclusive), defaulting to +-1.
 */
function randomMagnitude(magnitude) {
  if (magnitude === undefined) magnitude = 1;
  return randomRange(-magnitude, magnitude);
}

/** Change a value by a random amount with limits at +-magnitude. */
function perturb(value, magnitude) {
  return value + randomMagnitude(magnitude);
}

/** Has the same effect as perturb, but with a guaranteed minimum change. */
function perturbAggressive(value, magnitude, minDelta, loop) {
  var p;
  if (!loop) {
    p = minDelta * randomRange(1, magnitude / minDelta);
    if (Math.random() < 0) p = -p;
  } else {
    p = 0;
    while(Math.abs(p) < minDelta) {
      p = randomMagnitude(magnitude);
    }
  }
  return value + p
}

/**
 * Returns a coordinate that is roughly between 1.67 and 16.67 Km away.
 */
function perturbCoordinate(coord) {
  // one decimal place ~= 11.1 km
  // two decimal places ~= 1.1 km
  return perturbAggressive(coord, 0.15, 0.015);
}
