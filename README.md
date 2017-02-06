# app-starter
A starting point for using Polymer, Firebase with email/username/provider login, and Geofire.


## Bugs
* app-location: calling `redirect` does not change the url (but has the other desired effects).
* paper-input: minlength is not enforced
* app-layout: the drawer does not show, probably because it depends on behaviors,
  which still use the old style Polymer 1.x paradigm
  https://www.polymer-project.org/2.0/docs/about_20#behaviors
