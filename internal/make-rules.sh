#!/usr/bin/env bash
inputs="rules/*.bolt"
output="rules.bolt"
if [ -d "internal" ]; then
  inputs="internal/$inputs"
  output="internal/$output"
fi
for f in $inputs; do (cat "${f}"; echo; echo); done > $output
firebase-bolt $output