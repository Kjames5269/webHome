#!/bin/sh

echo "Starting build"
yarn

yarn format && git diff-files --quiet
if [ $? -ne 0 ]; then
    echo "Failing the build due to formatting"
    exit 1
fi

yarn eslint
if [ $? -ne 0 ]; then
    echo "Linting concerns failing build"
    exit 1
fi

yarn prod