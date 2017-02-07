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
    updates['/users/' + user + '/isElevated'] = true;
    db.update(updates, onSuccess, onFailure);
  }
};
