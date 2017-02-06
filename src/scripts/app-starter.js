/*
 * Functions specific to the app.
 */
'use strict';

/*
 * Categorical logging filters
 */
const USER = true;
const ROUTE = false;

function redirect(path) {
  document.getElementById('app').$['appLocation'].path = path;
}

function goBack() {
  var history = document.getElementById('app').history;
  console.log('history', history, 'length', length(history));
  if (history && history.length > 0) {
    for (var i = history.length - 1; i >= 0; i--) {
      if (history[i].path != '/login' && history[i].path != '/register') {
        console.log('redirecting to ', history[i].path);
        redirect(history[i].path);
        return;
      }
    }
  }
  redirect('/users');
}

function showSuccessToast(text, duration, properties) {
  document.getElementById('app').$['toast'].show('success', text, duration, properties);
}
function showErrorToast(text, duration, properties) {
  document.getElementById('app').$['toast'].show('error', text, duration, properties);
}
function showInfoToast(text, duration, properties) {
  document.getElementById('app').$['toast'].show('info', text, duration, properties);
}
function showWarningToast(text, duration, properties) {
  document.getElementById('app').$['toast'].show('warning', text, duration, properties);
}

function showServerErrorToast() {
  showErrorToast('Server error, try again.');
}

function showConfirmDialog(header, content, footer, confirm, cancel, onClosed) {
  document.getElementById('app').$['confirmDialog'].show(header, content, footer, confirm, cancel, onClosed);
}

function showSetUsernameDialog(uid, provider, onUsernameChosen) {
  document.getElementById('app').$['setUsernameDialog'].show(uid, provider, onUsernameChosen);
}
