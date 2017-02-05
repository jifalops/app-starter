var db = db || {};

db.users = {

  createUser: function(uid, username, user, profile, onSuccess, onFailure) {
    USER && console.log('Creating user ' + username);
    var updates = {};
    updates['/uids/' + uid] = username;
    updates['/usernames/' + username.toLowerCase()] = db.timestamp();
    updates['/profiles/' + username] = profile;
    updates['/users/' + username] = user;
    db.update(updates, onSuccess, onFailure);
  },

  changeAvatar: function (auth, url, onSuccess, onFailure) {
    USER && console.log('Changing profile pic to ' + url);
    var updates = db.userActionUpdate(auth.name);
    updates['/profiles/' + auth.name + '/pic'] = url;
    var jid;
    for (jid in auth.profile.jobPosts) {
      updates['/jobPosts/' + jid + '/creator/pic'] = url;
    }
    for (jid in auth.profile.requestPosts) {
      updates['/requestPosts/' + jid + '/creator/pic'] = url;
    }
    db.update(updates, onSuccess, onFailure);
  },

  updateLocation: function(user, lat, lng, onSuccess, onFailure) {
    USER && console.log('Updating location to', lat, lng);

    var doUpdate = function() {
      var updates = {};
      updates['/users/' + user + '/location'] = {
        modified: db.timestamp(),
        lat: lat,
        lng: lng
      };
      db.update(updates, onSuccess, onFailure);
    };

    var geofire = new GeoFire(db.ref('/geoUsers'));
    geofire.set(user, [lat, lng]).then(function () {
      doUpdate();
    }, function (error) {
      onFailure(error);
    });
  },

  changeDisplayName: function (auth, name, onSuccess, onFailure) {
    USER && console.log('Changing display name to ' + name);
    var updates = db.userActionUpdate(auth.name);
    updates['/profiles/' + auth.name + '/name'] = name;
    var jid;
    for (jid in auth.profile.jobPosts) {
      updates['/jobPosts/' + jid + '/creator/name'] = name;
    }
    for (jid in auth.profile.requestPosts) {
      updates['/requestPosts/' + jid + '/creator/name'] = name;
    }
    db.update(updates, onSuccess, onFailure);
  },

  setElevated: function(user, elevated, onSuccess, onFailure) {
    USER && console.log('Setting elevated to ' + elevated);
    var updates = db.userActionUpdate(user);
    updates['/users/' + user + '/isElevated'] = elevated;
    db.update(updates, onSuccess, onFailure);
  },

  sendFeedback: function(user, feedback, onSuccess, onFailure) {
    var f = {
      text: feedback,
      user: user,
      created: db.timestamp()
    };
    var key = db.newKey('/feedback/');
    var updates = db.userActionUpdate(user);
    updates['/feedback/' + key] = f;
    db.update(updates, onSuccess, onFailure);
  },


  addBlurb: function (user, type, blurb, onSuccess, onFailure) {
    USER && console.log('Adding ' + type + ' blurb: ', blurb);
    var key = db.newKey('/profiles/' + user + '/blurbs');
    var updates = db.userActionUpdate(user);
    updates['/profiles/' + user + '/blurbs/' + key] = {
      created: db.timestamp(),
      type: type,
      text: blurb
    };
    db.update(updates, onSuccess, onFailure);
    return key;
  },

  removeBlurb: function (user, blurbId, onSuccess, onFailure) {
    USER && console.log('Removing blurb: ' + blurbId);
    var updates = db.userActionUpdate(user);
    updates['/profiles/' + user + '/blurbs/' + blurbId] = null;
    db.update(updates, onSuccess, onFailure);
  },

  sendMessage: function(jid, sender, receiver, senderIsOwner, msg, title, isRequest, isAgreement, onSuccess, onFailure) {
    USER && console.log('Sending message to ' + receiver + ' regarding #' + jid);
    var path = '/messages/' + jid + '/' + (senderIsOwner ? receiver : sender);
    var key = db.newKey(path);
    var updates = db.userActionUpdate(sender);
    updates[path + '/' + key] = {
      author: sender,
      text: msg,
      created: db.timestamp()
    };
    updates['/users/' + receiver + '/unreadMessages/' + jid + '/' + sender] = {
      title: title,
      created: db.timestamp(),
      isRequest: isRequest,
      isAgreement: isAgreement
    };
    db.update(updates, onSuccess, onFailure);
  },

  markMessagesAsRead: function(user, jid, otherUser, onSuccess, onFailure) {
    USER && console.log('Marking messages from ' + otherUser + ' regarding #' + jid + ' as read.');
    var updates = {};
    updates['/users/' + user + '/unreadMessages/' + jid + '/' + otherUser] = null;
    db.update(updates, onSuccess, onFailure);
  }
};
