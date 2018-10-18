#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
COMMIT_MESSAGE=$(ci-github-utils get-comment -h "$CIRCLE_SHA1" -o "$CIRCLE_PROJECT_USERNAME" -r "$CIRCLE_PROJECT_REPONAME")

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/repo/.npmrc
echo $METEOR_SESSION > meteor_session.json

if [[ "$COMMIT_MESSAGE" =~ ^v[0-9]+\.[0-9]+\.[0-9]+ ]] && [ "$CIRCLE_BRANCH" == "master" ]; then
    # Atmosphere
    rm -rf node_modules
    METEOR_SESSION_FILE=meteor_session.json meteor publish

    # NPM
    node $DIR/sync-version.js
    npm publish
else
 echo "Skipping package publish step"
fi

echo $COMMIT_MESSAGE