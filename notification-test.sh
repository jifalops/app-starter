#!/usr/bin/env bash
key=$(head -n 1 notification-key.txt)
user=$(head -n 1 notification-user.txt)
curl --header "Authorization: key=$key" --header "Content-Type: application/json" -d "{\"to\": \"$user\", \"notification\": {\"title\": \"Hello World\", \"body\": \"This is a notification\"}}" https://fcm.googleapis.com/fcm/send
echo
