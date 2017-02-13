var db = db || {};

db.admin = {
  becomeRoot: function(user, onSuccess, onFailure) {
    var updates = db.userActionUpdate(user);
    updates['/roles/hasRoot'] = true;
    updates['/roles/root'] = user;
    updates['/roles/superAdmins/'   + user] = db.timestamp();
    updates['/roles/admins/'        + user] = db.timestamp();
    updates['/roles/maintainers/'   + user] = db.timestamp();
    updates['/roles/moderators/'    + user] = db.timestamp();
    updates['/users/' + user + '/isRoot']        = true;
    updates['/users/' + user + '/isSuperAdmin']  = true;
    updates['/users/' + user + '/isAdmin']       = true;
    updates['/users/' + user + '/isMaintainer']  = true;
    updates['/users/' + user + '/isModerator']   = true;
    updates['/users/' + user + '/isElevated']    = true;
    updates['/users/' + user + '/role']          = 'Root';
    db.update(updates, onSuccess, onFailure);
  }
};
