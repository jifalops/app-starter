#!/usr/bin/env bash
# "shell" must be a relative path in polymer.json.            src/app-shell.html
# "fragments" must use an absolute path in polymer.json.      /src/frag-mnt.html
# HTML imports must use relative paths inside the "shell" file.
# Tested with polymer-cli 0.17.0 and polymer 1.7.1.
polymer build
cp src/app-shell.html build/bundled/src/    # copy app shell
cp -rn bower_components build/bundled/      # copy only missing bower components
