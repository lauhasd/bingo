#!/bin/sh

echo "Building for github pages..."
npx react-scripts build >> /dev/null
mv build gh-build
echo "Done!"
