#! /bin/bash

tsc -p tsconfig.json && browserify Index.js > main.js && \
../node_modules/.bin/minify main.js > main.min.js && cp -i main.min.js ../
