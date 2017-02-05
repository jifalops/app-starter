/*
 * Firebase database utility functions not specific to any app.
 */
'use strict';


var db = db || {};

db.logging = true;

/**
 * Set this to your Firebase app name if not using the default app.
 */
db.appName = '';

/**
 * The app's Firebase database reference.
 */
db.ref = function(path) {
  return firebase.app(db.appName).database().ref(path);
};

/**
 * Perform multiple database updates as a single transaction.
 */
db.update = function(updates, onSuccess, onFailure) {
  db.logging && console.log('Performing update:', updates);
  db.ref().update(updates, db.callback(onSuccess, onFailure));
};

/**
 * Set the value at a single location in the DB.
 */
db.set = function(path, value, onSuccess, onFailure) {
  db.logging && console.log('Performing set:', path, value);
  return db.ref(path).set(value, db.callback(onSuccess, onFailure));
};

/**
 * Append to an array in the DB.
 */
db.push = function(path, value, onSuccess, onFailure) {
  db.logging && console.log('Performing push:', path, value);
  return db.ref(path).push(value, db.callback(onSuccess, onFailure));
};


/**
 * An object that will tell the server to insert the server time
 */
db.timestamp = function() {
  return firebase.database.ServerValue.TIMESTAMP;
};


/**
 * Get a new key from the DB.
 */
db.newKey = function(path) {
  return db.ref(path).push().key;
};


/**
 * Generic callback for database operations.
 */
db.callback = function(onSuccess, onFailure) {
  return function(error) {
    if (error) {
      db.logging && console.error('Operation failed: ', error);
      if (onFailure) onFailure();
    } else {
      db.logging && console.log('Operation succeeded.');
      if (onSuccess) onSuccess();
    }
  };
};


/**
 * Listen for changes at a database path.
 * See https://firebase.google.com/docs/reference/js/firebase.database.Reference#on
 */
db.watch = function(path, callback, cancelCallbackOrContext, context) {
  return db.ref(path).on('value', function(snapshot) {
    callback(snapshot.val());
  }, cancelCallbackOrContext, context);
}

/**
 * Stop listening for changes at a database path.
 */
db.unwatch = function(path, callback, context) {
  return db.ref(path).off('value', callback, context);
}

/**
 * Listen for a single change at a database path.
 */
db.read = function(path, successCallback, failureCallbackOrContext, context) {
  db.ref(path).once('value', successCallback, failureCallbackOrContext, context).then(
    function(snapshot) {
      successCallback(snapshot.val());
    }
  );
}
