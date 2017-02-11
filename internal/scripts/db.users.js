var db = db || {};

db.users = {
  createUser: function(uid, username, user, profile, onSuccess, onFailure) {
    DB && console.log('Creating user ' + username);
    var updates = {};
    updates['/uids/' + uid] = username;
    updates['/usernames/' + username.toLowerCase()] = db.timestamp();
    updates['/profiles/' + username] = profile;
    updates['/users/' + username] = user;
    db.update(updates, onSuccess, onFailure);
  },

  changeAvatar: function (user, url, onSuccess, onFailure) {
    DB && console.log('Changing profile pic to ' + url);
    var updates = db.userActionUpdate(user);
    updates['/profiles/' + user + '/pic'] = url;
    db.update(updates, onSuccess, onFailure);
  },

  updateLocation: function(user, lat, lng, onSuccess, onFailure) {
    DB && console.log('Updating location to', lat, lng);
    var geofire = new GeoFire(db.ref('/geoUsers'));
    geofire.set(user, [lat, lng]).then(function () {
      if (onSuccess) onSuccess();
    }, function (error) {
      if (onFailure) onFailure(error);
    });
  },

  changeDisplayName: function (user, name, onSuccess, onFailure) {
    DB && console.log('Changing display name to ' + name);
    var updates = db.userActionUpdate(user);
    updates['/profiles/' + user + '/name'] = name;
    db.update(updates, onSuccess, onFailure);
  },

  setElevated: function(user, elevated, onSuccess, onFailure) {
    DB && console.log('Setting elevated to ' + elevated);
    var updates = db.userActionUpdate(user);
    updates['/users/' + user + '/isElevated'] = elevated;
    db.update(updates, onSuccess, onFailure);
  },

  sendFeedback: function(user, feedback, onSuccess, onFailure) {
    var key = db.newKey('/feedback/');
    DB && console.log('Sending feedback', key);
    var updates = db.userActionUpdate(user);
    updates['/feedback/' + key] = {
      text: feedback,
      user: user,
      created: db.timestamp()
    };
    db.update(updates, onSuccess, onFailure);
  }
};
