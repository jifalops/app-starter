/*
 * Functions specific to the app.
 */
'use strict';

/*
 * Categorical logging filters
 */
var DB = true;
var AUTH = false;
var ROUTE = false;
var GEOFIRE = false;

function fire(context, name, data, options) {
  options = options || {};
  options.detail = data;
  if (!hasChild(options, 'bubbles')) {
    options.bubbles = true;
  }
  context.dispatchEvent(new CustomEvent(name, options));
}

function redirect(path) {
  document.getElementById('app').$['appLocation'].path = path;
}

function goBack() {
  var history = document.getElementById('app').history;
  // console.log('history', history, 'length', length(history));
  if (history && history.length > 0) {
    for (var i = history.length - 1; i >= 0; i--) {
      if (history[i].path != '/login' && history[i].path != '/register') {
        LOG && log.v('Redirecting to ', history[i].path);
        redirect(history[i].path);
        return;
      }
    }
  }
  redirect('/users/list');
}

/*
 * Notifications
 */
function showNotification(title, options, autoClose, onClick, onClose, onError) {
  return document.getElementById('app').$['notifications'].show(title, options, autoClose, onClick, onClose, onError);
}

/*
 * Toasts
 */
function showSuccessToast(text, duration, properties) {
  document.getElementById('app').$['toast'].showSuccessToast(text, duration, properties);
}
function showErrorToast(text, duration, properties) {
  document.getElementById('app').$['toast'].showErrorToast(text, duration, properties);
}
function showInfoToast(text, duration, properties) {
  document.getElementById('app').$['toast'].showInfoToast(text, duration, properties);
}
function showWarningToast(text, duration, properties) {
  document.getElementById('app').$['toast'].showWarningToast(text, duration, properties);
}
function showDefaultToast(text, duration, properties) {
  document.getElementById('app').$['toast'].showDefaultToast(text, duration, properties);
}
function showServerErrorToast() {
  showErrorToast('Server error, try again.');
}

/*
 * Dialogs
 */
function showConfirmDialog(header, content, confirm, cancel, onClosed) {
  document.getElementById('app').$['confirmDialog'].show(header, content, confirm, cancel, onClosed);
}
function showSetUsernameDialog(uid, provider, onUsernameChosen) {
  document.getElementById('app').$['setUsernameDialog'].show(uid, provider, onUsernameChosen);
}

/*
 *  Privilege checking
 */
function isModerator(role) {
  return role && role.match(/^(Moderator|Maintainer|Admin|Super Admin|Root)$/);
}
function isMaintainer(role) {
  return role && role.match(/^(Maintainer|Admin|Super Admin|Root)$/);
}
function isAdmin(role) {
  return role && role.match(/^(Admin|Super Admin|Root)$/);
}
function isSuperAdmin(role) {
  return role && role.match(/^(Super Admin|Root)$/);
}
function isRoot(role) {
  return role == 'Root';
}
function rolesLessThan(role) {
  switch(role) {
    case 'Moderator':   return ['User'];
    case 'Maintainer':  return ['User', 'Moderator'];
    case 'Admin':       return ['User', 'Moderator', 'Maintainer'];
    case 'Super Admin': return ['User', 'Moderator', 'Maintainer', 'Admin'];
    case 'Root':        return ['User', 'Moderator', 'Maintainer', 'Admin', 'Super Admin'];
    default:            return [];
  }
}
function isRoleGreaterThan(r1, r2) {
  return rolesLessThan(r1).includes(r2);
}
