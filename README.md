# app-starter
A starting point for using Polymer, Firebase with username/provider login, and Geofire.

Try it at https://app-starter-8f1a5.firebaseapp.com

**Note:** currently only tested on Chrome and Chrome for Android.

In order to demonstrate some content, users may click a button to add themselves
to the map. A user can add themselves at either a location given by a search result,
or their current location which will be moved a bit to hide exact location.


## Key features
* Firebase login using usernames or providers. Email can also be used but the username
input field does not currently allow the @ character.
* Users can link multiple providers to their account, which works around the inability
of sending password reset emails when using Firebase username logins.
* Main content stub: Users on a map/list.
  * Uses Geofire to find users within a given radius of a center point.
  * The center point can be a search result or the visitor's current location.
  * Any logged in user may optionally add themselves to the map by clicking a button.
  The center point will be the user's current location, anonymized to
  ~1 to 10 miles away.  
* User profile page with private info for the current user.
* Roles. Each role encompasses the abilities of the roles below it. Privileged users
may grant other users any role that is below them.
  * Root - The top role that cannot be changed. Become root by being the first person
  to the admin page and clicking "Become root".
  * Super Admin - Can take the site offline and give other users Admin privileges.
  * Admin - Admins have extra read/write capabilities to help police content.
  * Maintainer - Basically trusted moderators with a few extra read privileges.
  * Moderator - Community members with the ability to remove flagged content.
* An admin page for managing user roles and viewing site feedback.
* A messaging system which can allow more than one-to-one messages. Only one-to-one
messaging is used in the demo though.
* A test page for viewing certain aspects of the theme and trying toasts and notifications.
* A feedback page so any user can provide feedback. It includes a link to the issue
tracker here.
* Theming
* Bolt rules for Firebase.
* More stuff. Try to break it and file issues :)

### TODO
* ~~Cloud messaging / notifications~~
* Test on other browsers (not Chrome)
* Possibly show a toast or notification when a message is received (not push messages).
* Figure out non-push notifications on mobile.

### Known bugs and workarounds

#### Polymer 2.0-preview bugs
* app-location: calling `redirect` does not change the url (but has the other desired effects).
* paper-input: minlength is not enforced
* app-layout: the drawer does not show, probably because it depends on behaviors,
  which still use the old style Polymer 1.x paradigm
  https://www.polymer-project.org/2.0/docs/about_20#behaviors
* google-map: Has styles outside of template and fills the paper-material
* geofire-query: Works only if you copy the file locally  :(
* paper-input: using `--paper-input-container-input` causes errors.

#### Polymer 1.8 bugs
* dom-repeat does not show.
* paper-dropdown-menu does not overlay other items in iron-list.
  https://github.com/PolymerElements/paper-menu-button/issues/9
* paper-dropdown-menu --paper-input-container-input does not change with `@media` styles

#### Firefox bugs
* When permission granted for notifications, it requires a second click to show the notification.
* When permission granted for location, locations still doesn't work.
