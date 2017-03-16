#!/usr/bin/env bash
polymer build
cp -n src/app-shell.html build/bundled/src/    # copy app shell if necessary
cp -rn bower_components build/bundled/         # copy any missing bower components
# Make rules.json
cd internal
./make-rules.sh
