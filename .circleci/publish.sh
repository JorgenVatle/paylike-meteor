#!/usr/bin/env bash

COMMIT_MESSAGE=$(ci-github-utils get-comment -h "$CIRCLE_SHA1" -o "$CIRCLE_PROJECT_USERNAME" -r "$CIRCLE_PROJECT_REPONAME")

if [[ "$COMMIT_MESSAGE" =~ ^v[0-9]+\.[0-9]+\.[0-9]+ ]]; then
    rm -rf node_modules
    METEOR_SESSION_FILE=meteor_session.json meteor publish
else
 echo "Skipping package publish step"
fi

echo $COMMIT_MESSAGE