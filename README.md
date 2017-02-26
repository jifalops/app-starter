# App Starter
A starting point for using Polymer, Firebase, Geofire, and username/provider logins.

Try it at https://app-starter-8f1a5.firebaseapp.com

**Note:** currently only tested on Chrome and Chrome for Android.

In order to demonstrate some content, users may click a button to add themselves
to the map. A user can add themselves at either a location given by a search result,
or their current location which will be moved a bit to hide exact location.

## Usage

### Initial setup
The purpose of this repo is to be used as a starting point for a new app.
A typical way to accomplish that is

1. Clone this repo into your own `my-project` directory using SSH or HTTPS.

  ```
  # SSH
  git clone -b master git@github.com:jifalops/app-starter.git my-project
  ```
  ```
  # HTTPS
  git clone -b master https://github.com/jifalops/app-starter.git my-project
  ```

2. Setup the git remotes to be able to pull from this project and push/pull from your project.

  ```
  cd my-project
  git branch -m app-starter                           # Rename master branch
  git remote rename origin app-starter
  git remote set-url --push app-starter no-pushing    # Set push url to dead end
  git remote add origin [YOUR-REPO-URL]
  ```

3. Checkout a new branch to serve as your master branch.

  ```
  git checkout -b master
  ```

4. Change the branding to fit your project.
  * Replace the necessary information inside `src/app-firebase.html` to use your own Firebase info and replace the existing messaging sender ID in `firebase-messaging-sw.js`. Also set your default deploy location in `.firebaserc`.
  * Search the entire project and change `App Starter` to `My Project` and `app-starter` to `my-project` using your preferred editor or some other method. Also update the description of your project, which occurs in `index.html`, `bower.json`, `package.json`, `manifest.json`, and `README.md`.

5. Commit and push your changes.
  ```
  git add --all
  git commit -m 'Initial rebranding'
  git push -u origin master
  git push origin app-starter   # Creates the remote branch.
  ```

6. Finish the initial setup, test, and deploy your project.
  1. Install dependencies

    ```
    bower install --save
    ```

  2. Create the database rules.

    ```
    cd internal
    ./make-rules.sh
    cd ..
    ```

    **Note:** If you want to test locally before deploying, you will need to copy and paste `internal/rules.json` to the rules section in the Firebase console.

  3. Deploy

    ```
    ./polymer-build.sh
    firebase deploy
    ```

    **Note:** The build script is a work around for the gulp build not working correctly. It requires html-minifier (`npm i -g html-minifier`).

### Pulling in new changes
To pull in changes to app-starter into your existing project, use git rebase.

```
git checkout app-starter
git pull
git checkout master
git rebase app-starter
git push -f origin master
```

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
* `<dom-repeat>` does not show. Workaround is to use `<template is="dom-repeat"`
* paper-dropdown-menu does not overlay other items in iron-list.
  https://github.com/PolymerElements/paper-menu-button/issues/9
  Workaround is to use `<template is="dom-repeat"`
* paper-dropdown-menu --paper-input-container-input does not change with `@media` styles
