#!/usr/bin/env bash
# "shell" must be a relative path in polymer.json.            src/app-shell.html
# "fragments" must use an absolute path in polymer.json.      /src/frag-mnt.html
# HTML imports must use relative paths inside the "shell" file.
# Tested with polymer-cli 0.17.0 and polymer 1.7.1.
polymer build
cp src/app-shell.html build/bundled/src/    # copy app shell
# cp manifest.json build/bundled/             # copy manifest
# cp firebase-messaging-sw.js build/bundled/  # copy FCM service worker
cp -rn bower_components build/bundled/      # copy only missing bower components
# Minify html (npm i -g html-minifier)
# html-minifier --html5 --input-dir build/bundled/ --output-dir build/bundled --file-ext html --minify-css --minify-js --minify-ur-ls
cd internal/
./make-rules
cd ..
