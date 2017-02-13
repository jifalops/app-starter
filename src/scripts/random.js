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
function perturbAggressive(value, minMagnitude, maxMagnitude, loop) {
  var p;
  if (!loop) {
    p = minMagnitude * randomRange(1, maxMagnitude / minMagnitude);
    if (Math.random() < 0.5) p = -p;
  } else {
    p = 0;
    while(Math.abs(p) < minMagnitude) {
      p = randomMagnitude(maxMagnitude);
    }
  }
  return value + p
}

/**
 * Returns a coordinate that is roughly between 1.1 and 11.1 km away.
 */
function perturbCoordinate(coord) {
  // one decimal place ~= 11.1 km
  // two decimal places ~= 1.1 km
  return perturbAggressive(coord, 0.01, 0.1);
}
