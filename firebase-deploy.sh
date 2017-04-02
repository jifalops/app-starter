#!/usr/bin/env bash

# Build the database rules
cd internal
./make-rules.sh
cd ..

# Deploy the given project, or the default project if none given.
# Projects are defined in .firebaserc
if [ $1 ]; then
  firebase deploy -P $1
else
  firebase deploy
fi
