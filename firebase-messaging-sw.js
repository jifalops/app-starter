// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('/bower_components/firebase/firebase-app.js');
importScripts('/bower_components/firebase/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  // TODO set this to your messaging sender ID
  'messagingSenderId': '435083496955'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]

messaging.setBackgroundMessageHandler(function(payload) {
  const auth = firebase.auth().currentUser;
  if (auth) {
    db.read('/uids/' + auth.uid, function(username) {
      if (username == payload.data.to) {
        showNotification(payload);
      } else {
        console.log('Ignoring message to', payload.data.to);
        showNotification(payload); // TODO remove if notifications are working.
      }
    })
  } else {
    return showNotification(payload); // TODO remove if notifications are working.
  }
});

function showNotification(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    tag: payload.notification.tag,
    data: payload.notification.data,
    timestamp: payload.notification.timestamp,
    badge: payload.notification.badge,
    requireInteraction: payload.notification.requireInteraction
  };
  return self.registration.showNotification(title, options);
}

// [END background_handler]
