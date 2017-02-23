# app-starter
A starting point for using Polymer, Firebase with username/provider login, and Geofire.

####TODO
* Setup login providers (only google is currently available)
* Add login/register toasts for wrong user/pass etc.
* Add forgot password flow for login/register (complex).
* ~~Cloud messaging / notifications~~
* User to user communication

## Polymer 2.0-preview bugs
* app-location: calling `redirect` does not change the url (but has the other desired effects).
* paper-input: minlength is not enforced
* app-layout: the drawer does not show, probably because it depends on behaviors,
  which still use the old style Polymer 1.x paradigm
  https://www.polymer-project.org/2.0/docs/about_20#behaviors
* google-map: Has styles outside of template and fills the paper-material
* geofire-query: Works only if you copy the file locally  :(
* paper-input: using `--paper-input-container-input` causes errors.

## Polymer 1.8 bugs
* dom-repeat does not show.
* paper-dropdown-menu does not overlay other items in iron-list.
  https://github.com/PolymerElements/paper-menu-button/issues/9
* paper-dropdown-menu --paper-input-container-input does not change with `@media` styles
