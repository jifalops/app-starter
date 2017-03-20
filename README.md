# App Starter
A starting point for using Polymer, Firebase, Geofire, and username/provider logins.


Try it at https://app-starter-8f1a5.firebaseapp.com

In order to demonstrate some content, users may click a button to add themselves
to the map. A user can add themselves at either a location given by a search result,
or their current location which will be moved a bit to hide exact location.

## Usage

### Initial setup
The purpose of this repo is to be used as a starting point for a new app.
A typical way to accomplish that is

1. Clone this repo into your own `my-project` directory.

  ```
  git clone https://github.com/jifalops/app-starter.git my-project
  ```

2. Setup the git remotes to be able to pull from this project and pull/push to your project.

  ```
  cd my-project
  git remote rename origin app-starter
  git remote set-url --push app-starter no-pushing    # Set push url to dead end
  git remote add origin [YOUR-REPO-URL]
  ```

3. Change the branding to fit your project.
  * Replace the necessary information inside `src/app-firebase.html` to use your own Firebase info and replace the existing messaging sender ID in `firebase-messaging-sw.js`. Also set your default deploy location in `.firebaserc`.
  * Search the entire project and change `App Starter` to `My Project` and `app-starter` to `my-project` using your preferred editor or some other method. Also update the description of your project, which occurs in `index.html`, `bower.json`, `package.json`, `manifest.json`, and `README.md`.

4. Commit and push your changes.

  ```
  git add --all
  git commit -m 'Initial changes'
  git push -u origin master
  ```

5. Finish the initial setup, test, and deploy your project.
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

    **Note:** If you want to test locally before deploying, you will need to copy and paste `internal/rules.json` to the rules section your project's Firebase console.

  3. Deploy

    ```
    ./polymer-build.sh
    firebase deploy
    ```  

### Pulling in new changes
To update your existing project to use the newest version of app-starter,
merge in new changes or rebase your project on top of app-starter.

```
# If others are working from origin/master
git merge app-starter master
git push origin master
```

```
# Only do this if nobody else is using origin/master
git pull --rebase app-starter master
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
* ~~Figure out non-push notifications on mobile.~~
* Validate CSS custom properties.

### Known bugs and workarounds

#### Polymer 2.0-preview bugs
* app-location: calling `redirect` does not change the url (but has the other desired effects).
* paper-input: minlength is not enforced
* app-layout: the drawer does not show, probably because it depends on behaviors,
  which still use the old style Polymer 1.x paradigm
  https://www.polymer-project.org/2.0/docs/about_20#behaviors
* google-map: Has styles outside of template and fills the paper-material
* paper-input: using `--paper-input-container-input` causes errors.

#### Polymer 1.8 bugs
* paper-dropdown-menu does not overlay other items in iron-list.
  https://github.com/PolymerElements/paper-menu-button/issues/9
  Workaround is to use `<template is="dom-repeat"`
* paper-dropdown-menu --paper-input-container-input does not change with `@media` styles

## Contributing

1. Fork it on Github.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

[Apache](https://opensource.org/licenses/Apache)
