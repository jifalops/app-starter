/*
 * Firebase Cloud Functions (Firebase Cloud Messaging)
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/**
 * Triggers when a message is received by a user.
 * If the user has message notifications enabled, send them a notification.
 */
exports.sendMessageNotification = functions.database.ref('/chatMessages/{chat}/{msg}').onWrite(event => {
  const chat = event.params.chat;
  const msg = event.params.msg;
  const data = event.data.val();
  // If deleted we exit the function.
  if (!data) {
    return console.log('Message deleted ', chat, msg);
  }
  console.log('Message sent by ', data.author);

  // Get the other users in the chat.
  const getOtherUsersPromise = admin.database().ref(`/chats/${chat}`).once('value');
  // Get the sender's profile.
  const getSenderProfilePromise = admin.database().ref(`/profiles/${data.author}`).once('value');
  return Promise.all([getOtherUsersPromise, getSenderProfilePromise]).then(results => {
    const usernames = Object.keys(results[0].val());
    const senderProfile = results[1].val();
    for (var username in usernames) {
      notifyUser(username, senderProfile, data);
    }
  });
});

function notifyUser(username, senderProfile, data) {
  // Get the list of device notification tokens.
  const getDeviceTokensPromise = admin.database().ref(`/users/${username}/messagingTokens`).once('value');

  return Promise.all([getDeviceTokensPromise]).then(results => {
    const tokensSnapshot = results[0];

    // Check if there are any device tokens.
    if (!tokensSnapshot.hasChildren()) {
      return console.log(username +': There are no notification tokens to send to.');
    }
    console.log(username +': There are', tokensSnapshot.numChildren(), 'tokens to send notifications to.');

    // Notification details.
    const payload = {
      notification: {
        title: data.author,
        body: data.text,
        icon: senderProfile.pic
      }
    };

    // Listing all tokens.
    const tokens = Object.keys(tokensSnapshot.val());

    // Send notifications to all tokens.
    return admin.messaging().sendToDevice(tokens, payload).then(response => {
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
