var db = db || {};

db.admin = {
  becomeRoot: function(user, onSuccess, onFailure) {
    var updates = db.userActionUpdate(user);
    updates['/status/hasRoot'] = true;
    updates['/roles/' + user] = 'Root';
    updates['/users/' + user + '/role'] = 'Root';
    updates['/users/' + user + '/isElevated'] = true;
    db.update(updates, onSuccess, onFailure);
  },

  setRole: function(user, targetUser, role, onSuccess, onFailure) {
    DB && console.log('Setting role for', targetUser, 'to', role);
    var updates = db.userActionUpdate(user);
    updates['/roles/' + targetUser] = role == 'User' ? null : role;
    updates['/users/' + targetUser + '/role'] = role;
    db.update(updates, onSuccess, onFailure);
  },

  setOffline: function(user, offline, onSuccess, onFailure) {
    DB && console.log('Setting offline status to', offline);
    var updates = db.userActionUpdate(user);
    updates['/status/offline'] = offline;
    db.update(updates, onSuccess, onFailure);
  }  
};
