#!/usr/bin/env bash
$key=`cat notification-key.txt`
$user=`cat notification-user.txt`
curl --header "Authorization: key=$key" --header "Content-Type: application/json" -d '{"to": "$user", "notification": {"title": "Hello World", "body": "This is a notification"}}' https://fcm.googleapis.com/fcm/send
