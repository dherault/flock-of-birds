#!/bin/sh

read -p "Please enter your Git email: " email
read -p "Please enter your Git username: " username
git config --global user.email $email
git config --global user.name $username
git config --global push.default simple

echo "Git configured."
