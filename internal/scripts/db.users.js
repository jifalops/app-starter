var db = db || {};

db.users = {
  createUser: function(uid, username, user, profile, onSuccess, onFailure) {
    LOG && DB && console.log('Creating user ' + username);
    var updates = {};
    updates['/uids/' + uid] = username;
    updates['/usernames/' + username.toLowerCase()] = true;
    updates['/profiles/' + username] = profile;
    updates['/users/' + username] = user;
    db.update(updates, onSuccess, onFailure);
  },

  changeAvatar: function (user, url, onSuccess, onFailure) {
    LOG && DB && console.log('Changing profile pic to ' + url);
    var updates = db.userActionUpdate(user);
    updates['/profiles/' + user + '/pic'] = url;
    db.update(updates, onSuccess, onFailure);
  },

  updateLocation: function(user, lat, lng, onSuccess, onFailure) {
    LOG && DB && console.log('Updating location to', lat, lng);
    var geofire = new GeoFire(db.ref('/geoUsers'));
    geofire.set(user, [lat, lng]).then(function () {
      if (onSuccess) onSuccess();
    }, function (error) {
      if (onFailure) onFailure(error);
    });
  },

  changeDisplayName: function (user, name, onSuccess, onFailure) {
    LOG && DB && console.log('Changing display name to ' + name);
    var updates = db.userActionUpdate(user);
    updates['/profiles/' + user + '/name'] = name;
    db.update(updates, onSuccess, onFailure);
  },

  setElevated: function(user, elevated, onSuccess, onFailure) {
    LOG && DB && console.log('Setting elevated to ' + elevated);
    var updates = db.userActionUpdate(user);
    updates['/users/' + user + '/isElevated'] = elevated;
    db.update(updates, onSuccess, onFailure);
  },

  sendFeedback: function(user, feedback, onSuccess, onFailure) {
    var key = db.newKey('/feedback/');
    LOG && DB && console.log('Sending feedback', key);
    var updates = db.userActionUpdate(user);
    updates['/feedback/' + key] = {
      text: feedback,
      user: user,
      created: db.timestamp()
    };
    db.update(updates, onSuccess, onFailure);
  },

  sendMessage: function(user, otherUsers, chat, msg, onSuccess, onFailure) {
    LOG && DB && console.log('Sending message to', otherUsers);
    var updates = db.userActionUpdate(user);
    var i;
    if (!chat) {
      chat = db.newKey('/chats');
      updates['/chats/' + chat + '/' + user] = db.timestamp();
      for (i = 0; i < otherUsers.length; i++) {
        updates['/chats/' + chat + '/' + otherUsers[i]] = db.timestamp();
      }
    }

    var msgObj = {
      author: user,
      text: msg,
      created: db.timestamp()
    };

    var key = db.newKey('/chatMessages/' + chat);

    updates['/chatMessages/' + chat + '/' + key] = msgObj;

    updates['/users/' + user + '/chats/' + chat] = msgObj;
    for (i = 0; i < otherUsers.length; i++) {
      updates['/users/' + otherUsers[i] + '/chats/' + chat] = msgObj;
      // The following line allows lookup of a chat-id from a username,
      // and connects the one-to-one chat implementation with the one-to-many chat rules base.
      updates['/users/' + otherUsers[i] + '/messages/' + user] = chat;
      updates['/users/' + user + '/messages/' + otherUsers[i]] = chat;
    }

    db.update(updates, onSuccess, onFailure);
  },

  addProvider: function(user, provider, onSuccess, onFailure) {
    var updates = db.userActionUpdate(user);
    var key = db.newKey('/users/' + user + '/providers');
    updates['/users/' + user + '/providers/' + key] = provider;
    db.update(updates, onSuccess, onFailure);
  },

  addMessagingToken: function(user, token, onSuccess, onFailure) {
    db.set('/users/' + user + '/messagingTokens/' + token, true, onSuccess, onFailure);
  }
};
