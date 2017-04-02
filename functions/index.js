/*
 * Firebase Cloud Functions (Firebase Cloud Messaging)
 */
/* eslint no-console: */
/* eslint no-undef: */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/**
 * Triggers when a message is received by a user.
 * If the user has message notifications enabled, send them a notification.
 */
exports.sendMessageNotification = functions.database.ref(
    '/chatMessages/{chat}/{msg}').onWrite((event) => {
  const chat = event.params.chat;
  const msg = event.params.msg;
  const data = event.data.val();
  if (!data) {
    return console.log('Message deleted ', chat, msg);
  }
  console.log('Message sent by ', data.author);

  // Get the users in this chat.
  const chatUsersPromise = admin.database().ref(`/chats/${chat}`).once('value');
  // Get the sender's profile pic.
  const senderPicPromise = admin.database().ref(
    `/profiles/${data.author}/pic`).once('value');
  return Promise.all([chatUsersPromise, senderPicPromise]).then((results) => {
    console.log('There are', results[0].numChildren() - 1, 'users to send to.');
    const usernames = results[0].val();
    const pic = results[1].val();
    delete usernames[data.author];
    for (var username in usernames) {
      notifyUser(username, pic, data);
    }
  });
});

function notifyUser(username, pic, data) {
  const getUserDataPromise = admin.database().ref(
    `/users/${username}`).once('value');

  return Promise.all([getUserDataPromise]).then((results) => {
    const user = results[0].val();
    // Check that user allows notifications.
    if (!user.messageNotifications) {
      return console.log(username
        + ': User does not allow notifications for messages.');
    }

    const tokensSnapshot = results[0].child('messagingTokens');

    // Check if there are any device tokens.
    if (!tokensSnapshot.hasChildren()) {
      return console.log(username
        +': There are no notification tokens to send to.');
    }

    console.log(username +': There are', tokensSnapshot.numChildren(),
      'tokens to send notifications to.');

    // Notification details.
    const payload = {
      // Allowed params: https://firebase.google.com/docs/cloud-messaging/http-server-ref#notification-payload-support
      notification: {
        tag: 'app-starter.' + data.author,
        title: data.author,
        body: data.text,
        icon: pic,
        click_action: 'https://app-starter-8f1a5.firebaseapp.com/messages',
      },
      data: {
        tag: 'app-starter.' + data.author,
        fromUsername: data.author,
        to: username,
        created: String(data.created),
      },
    };

    // Listing all tokens.
    const tokens = Object.keys(tokensSnapshot.val());

    // Send notifications to all tokens.
    return admin.messaging().sendToDevice(tokens, payload).then((response) => {
      // For each message check if there was an error.
      const tokensToRemove = [];
      response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
          console.error('Failure sending notification to', tokens[index], error);
          // Cleanup the tokens who are not registered anymore.
          if (error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered') {
            tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
          }
        }
      });
      return Promise.all(tokensToRemove);
    });
  });
}
