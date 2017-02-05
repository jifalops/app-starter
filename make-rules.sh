#!/usr/bin/env bash
for f in rules/*.bolt; do (cat "${f}"; echo; echo); done > rules.bolt
firebase-bolt rules.bolt